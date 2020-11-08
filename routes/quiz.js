const path = require('path');
const express = require('express');
const router = express.Router();
const { name: projectId } = require('../package.json');

function requireUncached(module) {
  delete require.cache[require.resolve(module)];
  return require(module);
} // https://stackoverflow.com/a/16060619/4468834

const moment = require('moment');

const Firestore = require('@google-cloud/firestore');
const db = new Firestore({
  projectId,
});

router.get('/quiz', async (req, res, next) => {
  try {
    if (req.hostname == 'oph2020.sirirajmedcamp.com') return res.redirect('/');

    let quiz = await chooseQuiz();
    if (quiz == 'closed') return res.redirect('/');
    if (!req.user) throw new Error('กรุณาเข้าสู่ระบบ');
    if (req.user.submitted && req.user.submitted[quiz]) return res.render('submitted.ejs');
    res.render('quiz.ejs');
  } catch (e) {
    return next(e);
  }
});

const chooseQuiz = async () => {
  /* let now = moment();
  if (+now.format('mm') >= 40) return 'tt';
  if (+now.format('mm') >= 20) return 'po';
  return 'et'; */
  let cur = await db.collection('Console').doc('quiz').get();
  return cur.data().current;
}

router.get('/quiz/get', async (req, res, next) => {
  let quiz = await chooseQuiz();
  res.header("Content-Type",'application/json');
  res.json(requireUncached(path.resolve(__dirname, '../quiz', quiz + '.json')));
});

router.post('/quiz', async function (req, res, next) {
  try {
    let quizid = req.body.id;
    // console.log(req.body);
    delete req.body.id;
    
    await db.collection('Answers').doc().create({
      user: db.collection('Users').doc(req.user._id),
      answers: req.body,
      quiz: quizid
    });
    await db.collection('Users').doc(req.user._id).update({
      submitted: {
        [quizid]: true // https://stackoverflow.com/a/11043034/4468834
      }
    });
    // TODO: should do as transaction
  } catch (e) {
    return next(e);
  }
  req.flash('success', 'สำเร็จ');
  res.redirect('/');
});

router.get('/console', async (req, res, next) => {
  if (!req.user || req.user.email != 'admin') return res.redirect('/');
  return res.render('console.ejs');
});

router.get('/console/current', async (req, res) => {
  try {
    let cur = await db.collection('Console').doc('quiz').get();
    cur = cur.data();
    res.send(cur && cur.current);
  } catch (e) {
    return next(e);
  }
});

router.post('/console/set', async (req, res, next) => {
  try {
    await db.collection('Console').doc('quiz').update({
      current: req.body.quiz
    });
    res.redirect('/console');
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
