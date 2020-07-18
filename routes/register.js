const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const { name: projectId } = require('../package.json');

const Firestore = require('@google-cloud/firestore');
const db = new Firestore({
  projectId,
});

router.get('/register', (req, res, next) => {
  res.render('register.ejs');
});

router.post('/register', async function (req, res, next) {
  try {
    await User.createUser(req.body.email, req.body.tel);
    await (await db.collection('Users').where('email', '=', req.body.email).get()).docs[0].ref.update({
      name: req.body.name
    })
  } catch (e) {
    return next(e);
  }
  req.flash('success', 'ลงทะเบียนสำเร็จ คุณจะได้รับสูจิบัตรทาง email ที่กรอกไว้');
  res.redirect('/');
});

module.exports = router;