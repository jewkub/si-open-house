const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const { name: projectId } = require('../package.json');

const { google } = require('googleapis');
const sheet = require('../export/googleauth.js');

const Firestore = require('@google-cloud/firestore');
const db = new Firestore({
  projectId,
});

router.get('/cert', (req, res, next) => {
  if (req.user.cert) return res.send('https://storage.googleapis.com/si-open-house.appspot.com/cert/' + req.user.email + '.pdf?ignoreCache=1');
  // https://stackoverflow.com/a/37124554
  res.send('');
});

module.exports = router;