const express = require('express');
const { name: projectId } = require('./package.json');

const Firestore = require('@google-cloud/firestore');
const db = new Firestore({
  projectId,
});

let x = async () => {
  let a = await db.collection('Users').where('submitted.q2', '==', false).get();
  a.docs.forEach(e => {
    console.log(e.get('email'));
    /* e.ref.update({
      'submitted.q2': false,
    }); */
  });
};
// x();

`aiya.supawee@gmail.com -> สุปวีณ์ เพ็ชรตระกูล
athitaya33943@gmail.com -> อาทิตยา​ มหาเจริญสิริ
nutnisha.n@gmail.com -> ณัฐณิชาช์ น้อยมณี
punlipa24boong@gmail.com -> นางสาวพัลลิภา ชื่นตา
ajpatarakorn@gmail.com -> นายภัทรกร สิริทรัพย์อุดม
anniesjc103@gmail.com -> นางสาว อัจฉริยา โรจน์บัณฑิต
kanjareesuppawittaya@gmail.com -> กัญจรีย์ ศุภวิทยา
sirapatpingping@gmail.com -> สิรภัทร อรุณกิจกำจร
monpon53000329@gmail.com -> พรอุมา เทียมทิพาบุญกร
mintpanyasiri2@gmail.com -> น.ส.ปัญญาสิริย์ ทองทิพย์
plangern8475@gmail.com -> นางสาวชลธิชา แสงแก้ว
pinyaphat165@gmail.com -> น.ส.ภิญญาพัขร์ เรืองหิรัญธนากิจ
ksrisonmanee@gmail.com -> กิตติยา ศรีสอนมณี
Prowwe25477@gmail.com -> พิมพ์พราว พานิช
mildmy46@gmail.com -> นางสาวชลธิชา ปราบพาลา
sobus2611@gmail.com -> จิราพร ขวัญทอง
alicha.morabut28499@gmail.com -> นางสาวอลิชา โมราบุตร
pamol.jjj@gmail.com -> ปมณฑ์ เลาอโศก
act2192397@gmail.com -> ไกรวิชญ์ สาธิตธรรมพร
khungao2548@gmail.com -> พงศ์นคร คุณสุข
0805katawutton@gmail.com -> นายคฑาวุฒิ มีไพศาล
sarunpron48@gmail.com -> สรัลย์พร อัครเศรษฐัง
parenathathida@gmail.com -> ณัฏฐธิดา ปานศรี
orathaipongpo@gmail.com -> อรทัย ประเสริฐรุ่งเรือง
dommy0459@gmail.com -> ธนกร วุฒิพันธุ์
chanigan92546@gmail.com -> ชนิกานต์ ซ้วนลิ่ม
thanyarat.snr@gmail.com -> ธัญยรัตน์ ถิรธนาพงศ์ทวี
tanatzzz45@gmail.com -> นายธนัช รติประเสริฐ
pplpsll2547@gmail.com -> น.ส.พิมพ์ลภัส สาลี
shanekristalyn@gmail.com -> สุวภัทร ขำเลิศ
kmind46@gmail.com -> อิศวรา คงศรีเจริญ
plaifahthunwaporn@gmail.com -> ธันวาพร พันภู
ployraweeviwe@gmail.com -> พลอยรวี ผิวทองอ่อน
panaddajanyuenyong@gmail.com -> ปนัดดา จันทร์ยืนยง
eunatthahathai@gmail.com -> ณัฏฐหทัย เหล่าธิรพาณิช
nigyuri555@hotmail.com -> ณัฐพันธุ์ บุญทอง
25034@mtk.ac.th -> นางสาว ธิติรัตน์ ท้าวอินทร์
khunsaijai298@gmail.com -> ยสพันธ์ ฐิติวัฒนาการ
pinnachaya22@gmail.com -> นางสาว ปฤณชญา วิทิตพันธ์
nattichachin7904@gmail.com -> นางสาว นัทธิชา ชิณวรรณะ
ing.tidasawan@gmail.com -> นางสาวธิดาสวรรค์ จันคำ
aonant4603@gmail.com -> นางสาวพิกุลแก้ว ศรีแสง
maylalita2546@gmail.com -> นางสาวลลิตา ชาญทิพย์พงษ์
thitapha95475447@gmail.com -> นางสาวฐิตาภา แซ่เซียว
sainam743s@gmail.com -> วชิรญาณ์ รัตนพันธ์
ariya.bua@pccpl.ac.th -> อริยา บัวหลวง
10728piyaporn@gmail.com -> ปิยภรย์ ศิริภักดีชัยกุล
yokkie004@gmail.com -> ณัฐจรัสพร ทิพนาถศุภวิชญ์
pawineekhomdoiy@gmail.com -> นางสาว ภาวิณี คมด้วย
namsiri.drive@gmail.com -> สิริพัทธ์ อัครเศรษฐัง
tnp.ffluk3346@gmail.com -> ธนพล คุณดี
veerapattra1999@gmail.com -> วีรภัทรา สุวรรณนามัย
xcornight123@gmail.com -> นายธนัช  ไชยชนะ
chisa.ice2zaa@gmail.com -> ชิสา เพชรขจี
srnongpanga@gmail.com -> Nong siri
aomsin47702@gmail.com -> นางสาวสุทธิกา จันเป็งผัด
Phannita0_0@outlook.com -> พัณณิตา กุลวรกุลพิทักษ์
bhannbhannbhann@gmail.com -> นาย ปัญญ ไตรรัตน์วรกุล
beem212224236@gmail.com -> ธีรยุทธ พฤษพงษ์
phurin-jeffy@hotmail.com -> นายภูรินทร์ วนาศรีวิไล
patcharapa7249@gmail.com -> พัชราภา อยู่เย็นเจริญ
Nitirat4939@gmail.com -> น.ส.นิติรัฐ สุทธิกุล
bestapple5438@gmail.com -> นภชนก โนทิพย์
Putthachartwanwan@gmail.com -> พุทธชาด เนตรสุวรรณ
Pangthanakorn@hotmail.com -> ธนกร เลิศศิริลัดดา
nichasop@gmail.com -> ณิชา โสภานนท์
numeiji.dekdee@gmail.com -> ริญญาภัทร์ ศิรมงคลนิธิคุณ

tensai.gt99@gmail.com -> วาฑิณี ศรีตะลา
Phompornsongka@gmail.com -> พรหมพร สงกา
kanyaratprasanit@gmail.com -> นางสาวกัญญารัตน์ ประสนิท
60318.patsrapa@ds.ru.ac.th -> พัชราภา  โพธิโกฏ
doratsukikitty1@gmail.com -> อสึขิ มัทสึซาว่า
chutikan7281@gmail.com -> ชุติกาญจน์ ธรรมใจ
nunnun_t@hotmail.com -> สิราวุธ​ มโนธรรม
yellychanita@gmail.com -> ชนิตา สว่างแสนสุข
napatsorn.fr@gmail.com -> นภัสสร ปัญญาใจ
93-32002@suriyothai.ac.th -> Mathucha Prakobkij
jirapasarana0@gmail.com -> นางสาวจิราภา  สาระณา
taiabc48@gmail.com -> อิษยา อมรชัยเลิศรัตน์
ammystudy18@gmail.com -> นางสาว ณัฐนิชา เสน่หา
focussmile15097@hotmail.com -> ณภัทร บริสุทธิ์ประสิทธิ์
nongpim1717@gmail.com -> นางสาวรัญชิดา คงศรีรัตน์
duangjai.ml@gmail.com -> พิชญานิน จันทร์พรมราช
nene8882547@gmail.com -> ณัฐกาญจน์ ตรั่นวัน
naiyana6173@gmail.com -> นัยนา  อินคง
namo23684@gmail.com -> สิรวิชญ์ บุญก่อเกียรติกุล
snapueii@gmail.com -> ปุณยภา เซ้งมณี
thanchanok23042547@gmail.com -> นางสาว ธัญชนก โนนทนวงษ์
suthasinee2208@gmail.com -> สุธาสินี กำทอง
Manusanan48@gmail.com -> มนัสนันท์ ภิญโญเศรษฐ์
Garfield_kongkaew@hotmail.com -> พศวีร์ กองแก้ว
apipusirifah32901@gmail.com -> อภิภู ศิริฟ้า
tawansiri2545@gmail.com -> สิริมา งามมานะ
bbaammpatintida@gmail.com -> นางสาว พาทินธิดา เฉลยพจน์
siwapriya28@gmail.com -> น.ส.ศิวปรียา แก้วพิภพ
mafai.ui2545@gmail.com -> ชลารินทร์ อุ้ยศรีคูณ
natthada.deeroop@yahoo.com -> ณัฎฐา ดีรูป
gingpitchapa123@gmail.com -> พิชชาภา เจริญคุณาวัฒน์
poonsuppawittaya@gmail.com -> พิวัฒน์ ศุภวิทยา
arsirapa2548@gmail.com -> นางสาวอาศิรภา มหาธนานุสรณ์
phapakorns@gmail.com -> ปภังกร สัตย์ซื่อ
noey.chathatai.p@gmail.com -> ฉัตรหทัย ภคนันท์พงศ์กุล
pannate21@gmail.com -> ปานเนตร เกตุสุวรรณ
hi.praew@gmail.com -> วรณํบ อัตถจรรยากุล
kanta142546@gmail.com -> กันตา บุญเทียน
kanyakorn201580@gmail.com -> กัลยกร แพวขุนทด
rattiyapornsim@gmail.com -> รัตติยาภรณ์ แซ่ฮั่น
ttnlp04@gmail.com -> ณิลินพัชร์ สอนประเสริฐ
petchgrongkan@gmail.com -> นางสาว กรองกาญจน์ สายสิทธิ์
06541@sompoy.ac.th -> นางสาว กุลสตรี แพงชาติ
03044@psuwit.ac.th -> นางสาวจิตสุภา นะแส
panyaporn0449@gmail.com -> ปัญญาพร สุวรรณสิทธิ์
sadlongfortime@gmail.com -> ปุณยภา  เทียนเสม
minnathamon@gmail.com -> Nathamon Boonsai
nan190447@gmail.com -> ธัญชนก เชื้อเมืองพาน
arthitaya9088@gmail.com -> อาทิตยา ศิริผล
pppppnc27@gmail.com -> นางสาว นภสร ช้าเบ็ญจา
giant645t@gmail.com -> นางสาว ชนันธิดา จันทร์ภูมิ
potapa41@gmail.com -> นางสาวพจน์อาภา พวงลำใย
nongbell_04@hotmail.com -> ปาลิตา นิ่มทองคำ
kamolnchanok5059@gmail.com -> กมลชนก น้ำขาว
Petpimol7147@gmail.com -> เพ็ชรพิมล เกบุตร
uengchuen2545@gmail.com -> นางสาวณัฐชา อึงชื่น
kaopansk139@gmail.com -> วิทย์วศิน ฝังกิจ
chotipong4645@gmail.com -> นางสาวกรรณิกา โชติพงศ์
nook.su@hotmail.com -> นางสาวภูริศา  วัชรอำไพวัณย์
raveewish@gmail.com -> นาย รวีวิชญ์ แอ่งขุมทรัพย์
kantop9383@gmail.com -> นายทวิกานต์   สุขหน้าไม้
apinyaniw998@gmail.com -> อภิญญา ฉิมกลาง
Jirawat_golftogolf@hotmail.com -> นายจิรวัฒน์ เจริญชลวานิช
nannicha8516@gmail.com -> นันทน์ณิชา หยังหลัง
chanapaniti@gmail.com -> น.ส.ชนาภา นิธิพูนโชค
creamz9874@gmail.com -> อัครยา โตพิบูล
vasupolwin@outlook.com -> วสุพล จุฑานพมณี
panjarat47@icloud.com -> ปัญจรัตน์ สุวรรณรัศมี
kaw112546@gmail.com -> วีรภัทร​ ปรัยนุ
taksawadeec@gmail.com -> ทักษวดี ชอบจิตต์
kpattara10@gmail.com -> กัญญานัฐ ภัทรพรพงศ์
nisreen062546@gmail.com -> นิสรีน นุ้ยคดี 
suwalaktun@gmail.com -> นายสุวลักษณ์ ตันชัยเอกกุล
radamaneedoww@hotmail.com -> นางสาวรดามณี ปณารัตน์
waranya.25080@gmail.com -> น.ส.วรัญญา ลิ้มเจริญธัญญะผล
kunkhanunthong2549@gmail.com -> นายธนภัทร ขนุนทอง
krathomhutch@gmail.com -> น้ำทอง กฤตยพงษ์
yutthon7700@gmail.com -> นายยุทธร ก่อธรรมเจริญ
niwongsakaew@gmail.com -> นางสาวผกาแก้ว นิวงษา
Aninonine@gmail.com -> ไพบูลย์ ทศพลไพศาล
intatch513@gmail.com -> นายอินทัช อวยพร
Pannaponnamphro@pccbr.ac.th -> Pannapon Namphro 
15837@csw.ac.th -> ณัฏฐณิชา มณีรัตน์
kao1thanaporn@gmail.com -> ธนภรณ์  ลี้จากภัย
onpreeya.chusom@gmail.com -> อรปรียา ชูสม
Pol.singkarin@gmail.com -> อติภัทร ศฤงคารินทร์
nua912464@hotmail.co.th -> รัตนชญา ฤกษ์วนาพิพัฒน์
thanaporn.lamkratok@gmail.com -> ธนภรณ์ แหลมกระโทก
supharat10849@gmail.com -> ศุภรัตน์ ตันติปริมงคล
pprimkungg@gmail.com -> ณัฏฐณิชา ปานรัตน์
salutasaohong@gmail.com -> ศลุตา เสาหงษ์
pureekong@gmail.com -> นายภูรี วรพิทักษ์
artima10171819@gmail.com -> อาทิมา สนั่นวงค์สังข์
vitchayada.2546@gmail.com -> วิชญาดา ตั้งสมาจาร
taetayza@gmail.com -> นรบดี จิตต์ประสงค์
chaisiri2682547@gmail.com -> นาย ไชยศิริ  พิบูลชล
netraya2@gmail.com -> นางสาวเนตรยา เที่ยงน่วม
siriphattarinya@gmail.com -> น.ส.สิริภัทริญญา ว่องพิทูรมานะชัย`.split('\n').slice(0, 50).forEach(e => {
  console.log(e.split(' -> ')[1]);
});