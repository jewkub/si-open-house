import * as fs from 'fs/promises';
import * as path from 'path';
import fontkit from '@pdf-lib/fontkit';

import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// https://stackoverflow.com/a/50052194

// const { Storage } = require();
import { Storage } from '@google-cloud/storage';
const storage = new Storage({
  projectId: 'si-open-house',
});
const bucket = storage.bucket('si-open-house.appspot.com');

// const Firestore = require('@google-cloud/firestore');
import { Firestore } from '@google-cloud/firestore';
const db = new Firestore({
  projectId: 'si-open-house',
});

import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';

let pdf = await fs.readFile(path.resolve(__dirname, 'certificate.pdf'));
 
// This should be a Uint8Array or ArrayBuffer
// This data can be obtained in a number of different ways
// If your running in a Node environment, you could use fs.readFile()
// In the browser, you could make a fetch() call and use res.arrayBuffer()
const existingPdfBytes = pdf;

// open a font synchronously
const fontData = await fs.readFile(path.resolve(__dirname, 'cordia.ttf'));
const cordiaFont = fontkit.create(fontData);

const createCert = async (email, name) => {
  return new Promise(async (res, rej) => {
    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);

    // Embed the Helvetica font
    const cordia = await pdfDoc.embedFont(fontData, {
      subset: true // https://github.com/Hopding/pdf-lib/issues/549#issuecomment-668678026
    });
    // console.log(cordia.encodeText);
    
    // Get the first page of the document
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    
    // Get the width and height of the first page
    const { width, height } = firstPage.getSize();
    // console.log(width, height);
    
    // Draw a string of text diagonally across the first page
    let text = name;
    // let text = 'นางสาวธนัชญา​ ธนรัตนสุทธิ์​';
    let size = 50;
    firstPage.drawText(text, {
      x: width / 2 - cordia.widthOfTextAtSize(text, size) / 2,
      y: 350,
      size: size,
      font: cordia,
      color: rgb(0, 0, 0.5),
      rotate: degrees(0),
    });
    
    
    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();
    
    // For example, `pdfBytes` can be:
    //   • Written to a file in Node
    //   • Downloaded from the browser
    //   • Rendered in an <iframe>

    // return await fs.writeFile(path.resolve(__dirname, email + '.pdf'), pdfBytes);

    const file = bucket.file('cert/' + email + '.pdf');
    
    const stream = file.createWriteStream({
      metadata: {
        contentType: 'application/pdf'
      },
      resumable: false
    });

    stream.on('error', (err) => {
      /* e.cloudStorageError = err;
      next(err); */
      console.log(err);
    });

    stream.on('finish', async () => {
      // e.cloudStorageObject = gcspath;
      file.makePublic();
      (await db.collection('Users').where('email', '=', email).get()).docs[0].ref.update({
        cert: true
      });
      res('ok');
    });

    stream.end(pdfBytes);
    
    return ;
  });
}

let pass = await db
  .collection('Users')
  .where('cert', '=', false)
  /* .where('submitted.eval', '=', true) */
  /* .limit(50) */
  .get();

console.log(pass.docs.length);

for (let e of pass.docs) {
  e = e.data();
  if (e.cert) continue;
  e.name = e.name
    .replace(/^\ *(ด\.ญ\.)\ */, 'เด็กหญิง')
    .replace(/^\ *(ด\.ช\.)\ */, 'เด็กชาย')
    .replace(/^\ *(น\.ส\.)\ */, 'นางสาว');
  await createCert(e.email, e.name);
  console.log(e.email);
}

export default createCert;
