const express = require('express');
const router = express.Router();
const { name: projectId } = require('../package.json');

const Firestore = require('@google-cloud/firestore');
const db = new Firestore({
  projectId,
});

//error test
router.get('/err', (req, res, next) => {
  next(new Error('eiei'));
});

// get session
router.get('/session', (req, res, next) => {
  console.log(req.session);
  next(new Error('don\'t come here!'));
});

router.get('/email', (req, res, next) => {
  res.send(req.user.get('email'));
});

router.get('/flash/error', (req, res, next) => {
  let error = req.flash('error');
  res.json(error);
});

router.get('/flash/success', (req, res, next) => {
  let success = req.flash('success');
  res.json(success);
});

router.get('/countcert', async (req, res, next) => {
	let a = (await db.collection('Users').where('cert', '=', true).get()).docs;
	console.log(a.length);
});

const correct = {};

router.get('/count', async (req, res, next) => {
  let a = (await db.collection('Answers')
    .where('quiz', '=', 'q1')
    .where('answers.q-1', '=', '5')
    .where('answers.q-2', '=', '4')
    .get()).docs;
  console.log(a.length);
  a.forEach(async e => {
    let u = (await e.get('user').get()).data();
    // console.log(u.email);
    correct[u.email] = correct[u.email] || 0;
    correct[u.email]++;
  });

  a = (await db.collection('Answers')
    .where('quiz', '=', 'q2')
    .where('answers.q-1', '=', '2')
    .where('answers.q-2', '=', '2')
    .where('answers.q-3', '=', '2')
    .get()).docs;
  console.log(a.length);
  a.forEach(async e => {
    let u = (await e.get('user').get()).data();
    // console.log(u.email);
    correct[u.email] = correct[u.email] || 0;
    correct[u.email]++;
  });

  a = (await db.collection('Answers')
    .where('quiz', '=', 'q3')
    .where('answers.q-1', '=', '3')
    .where('answers.q-2', '=', '4')
    .where('answers.q-3', '=', '4')
    .where('answers.q-4', '=', '4')
    .where('answers.q-5', '=', '3')
    .get()).docs;
  console.log(a.length);
  a.forEach(async e => {
    let u = (await e.get('user').get()).data();
    // console.log(u.email);
    correct[u.email] = correct[u.email] || 0;
    correct[u.email]++;
  });

  for (let i in correct) {
    let user = (await db.collection('Users').where('email', '=', i).get()).docs[0];
    if (!user.get('submitted.eval')) continue;
    if (correct[i] == 3) console.log(i + ' -> ' + user.get('name'));
    // else console.log(i + ': no');
  }

  res.send('ok')
  
});

module.exports = router;
