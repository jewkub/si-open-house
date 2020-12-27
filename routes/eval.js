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

router.get('/eval', (req, res, next) => {
  if (req.user.submitted && req.user.submitted.eval) return res.redirect('/');
  res.render('eval.ejs');
});

const prefill = function (a) {
  this[a] = this[a] || '';
}

router.post('/eval', async function (req, res, next) {
  try {
    await (await db.collection('Users').where('email', '=', req.user.email).get()).docs[0].ref.update({
      'submitted.eval': true,
    });
  
    req.flash('success', 'ประเมินสำเร็จ');
    res.redirect('/');

    req.body['in8-t-1'] = req.body['in8-t-1'] || 'n/a';
    req.body['in8-t-2'] = req.body['in8-t-2'] || 'n/a';
    req.body['in9-t-1'] = req.body['in9-t-1'] || 'n/a';
    req.body['in9-t-2'] = req.body['in9-t-2'] || 'n/a';
    req.body['in10-t-1'] = req.body['in10-t-1'] || 'n/a';
    req.body['in10-t-2'] = req.body['in10-t-2'] || 'n/a';
    req.body['in11-t-1'] = req.body['in11-t-1'] || 'n/a';
    req.body['in11-t-2'] = req.body['in11-t-2'] || 'n/a';
    
    sheet(async auth => {
      const sheets = google.sheets({version: 'v4', auth});
      const range = 'eval!A3:BZ';
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