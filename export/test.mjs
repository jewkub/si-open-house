import * as fs from 'fs/promises';
import fontkit from '@pdf-lib/fontkit';
import { PDFDocument } from 'pdf-lib';

const pdfDoc = await PDFDocument.create();

pdfDoc.registerFontkit(fontkit);

const fontData = await fs.readFile('export/cordia.ttf');
const myFont = await pdfDoc.embedFont(fontData, { subset: true });
const page = pdfDoc.addPage();
page.drawText('น้ำ คล้ำ', {
  font: myFont,
  x: 50,
  y: 50
});
const pdfBytes = await pdfDoc.save();

await fs.writeFile('testtest.pdf', pdfBytes);