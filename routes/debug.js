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

module.exports = router;
