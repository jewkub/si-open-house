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

router.get('/register', (req, res, next) => {
  res.render('register.ejs');
});

router.post('/register', async function (req, res, next) {
  try {
    await User.createUser(req.body.email, req.body.tel);
    await (await db.collection('Users').where('email', '=', req.body.email).get()).docs[0].ref.update({
      name: req.body.name,
      tel: req.body.tel,
      data: Object.values(req.body),
    });
  
    req.flash('success', 'ลงทะเบียนสำเร็จ คุณจะได้รับสูจิบัตรทาง email ที่กรอกไว้ พบกันวันที่ 14 พย. 2563 เวลา 19.15');
    res.redirect('/');
    
    sheet(async auth => {
      const sheets = google.sheets({version: 'v4', auth});
      const range = 'register!A2:AI';
      let res = (await sheets.spreadsheets.values.append({
        spreadsheetId: '1-kCuChELm0eN4h6Va_Smil97PrezxomZDsoqZo0T1mI',
        range: range,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
          range: range,
          majorDimension: 'ROWS',
          values: [
            Object.values(req.body)
          ],
        },
      }));
      if (res.status != 200) console.log(res.statusText);
    });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;