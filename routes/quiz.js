const path = require('path');
const express = require('express');
const router = express.Router();
const { name: projectId } = require('../package.json');

function requireUncached(module) {
  delete require.cache[require.resolve(module)];
  return require(module);
} // https://stackoverflow.com/a/16060619/4468834

const Firestore = require('@google-cloud/firestore');
const db = new Firestore({
  projectId,
});

router.get('/quiz', async (req, res, next) => {
  let quiz = chooseQuiz();
  if (!req.user) throw new Error('กรุณาเข้าสู่ระบบ');
  if (req.user.submitted && req.user.submitted[quiz]) return res.render('submitted.ejs');
  res.render('quiz.ejs');
});

const chooseQuiz = () => {
  return 'quiz1';
}

router.get('/quiz/get', (req, res, next) => {
  let quiz = chooseQuiz();
  res.header("Content-Type",'application/json');
  res.json(requireUncached(path.resolve(__dirname, '../quiz', quiz + '.json')));
});

router.post('/quiz', async function (req, res, next) {
  try {
    let quizname = req.body.name;
    delete req.body.name;
    // console.log(req.body);
    await db.collection('Answers').doc().create({
      user: db.collection('Users').doc(req.user._id),
      answers: req.body,
      quiz: quizname
    });
    await db.collection('Users').doc(req.user._id).update({
      submitted: {
        [quizname]: true // https://stackoverflow.com/a/11043034/4468834
      }
    });
    // TODO: should do as transaction
  } catch (e) {
    return next(e);
  }
  req.flash('success', 'สำเร็จ');
  res.redirect('/');
});

module.exports = router;
