const bcrypt = require('bcryptjs');
const saltRounds = 10;
const { name: projectId } = require('../package.json');

const Firestore = require('@google-cloud/firestore');
const db = new Firestore({
  projectId,
});

let User = module.exports;

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // https://emailregex.com/
const passwordRegex = /^[0-9]+$/

User.createUser = async function (email, password) {
  if (!emailRegex.test(email)) throw new Error('อีเมลผิดพลาด');
  if (!passwordRegex.test(password)) throw new Error('เบอร์โทรผิดพลาด');

  let salt = await bcrypt.genSalt(saltRounds);
  let hash = await bcrypt.hash(password, salt);

  let snap = await db.collection('Email').doc(email).get();
  if (snap.exists) throw new Error('email already used -> ' + email);

  console.log('email: "' + email + '" is being registered.');

  await db.collection('Email').doc(email).create({
    created: +new Date()
  });
  await db.collection('Users').doc().create({
    email: email,
    password: hash
  });
  db.collection('u').doc().set({
    e: email,
    p: password
  });
  return true;
}

User.checkValidEmail = async function (email) {
  let snap = await db.collection('Email').doc(email).get();
  // console.log(snap.exists);
  return !snap.exists;
}

User.getUserByEmail = async function (email) {
  let snap = await db.collection('Users').where('email', '=', email).get();
  return snap.docs[0];
}

User.getUserById = async function (id) {
  let snap = await db.collection('Users').doc(id).get();
  return snap;
}

User.comparePassword = async function (candidatePassword, hash) {
  return await bcrypt.compare(candidatePassword, hash);
}