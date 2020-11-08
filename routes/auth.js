const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

const session = require('cookie-session');
const flash = require('connect-flash');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const secret = require('../secret/secret.json');

router.use(session({
  name: 'session',
  secret: process.env.SESSION_SECRET,
  cookie: {
    expires: new Date(2147483647000) // Tue, 19 Jan 2038 03:14:07 GMT
  },
  /* saveUninitialized: false,
  resave: true */
}));

router.use(flash());

// Passport init
router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy({
	usernameField: 'email',
}, async function (email, password, done) {
	try {
		let user = await User.getUserByEmail(email);
		if (!user) return done(null, false, {message: 'ไม่พบอีเมลนี้'});
		let result = await User.comparePassword(password, user.get('password'));
		// console.log('login!');
		// console.log(user);
		if (result) return done(null, user);
		return done(null, false, {message: 'รหัสผ่านผิด'});
	} catch (e) {
		return done(e, false);
	}
}));

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
	try {
		let user = await User.getUserById(id);
		let out = user.data() || {};
		out._id = user.ref.id;
		delete out.password;
		done(null, out);
		// done(null, id);
	} catch (e) {
		done(e, null);
	}
});

router.post('/login', (req, res, next) => {
	passport.authenticate('local', function (err, user, info) {
    if (err) return res.json(err);
    if (!user) return res.json(info.message); 
    req.logIn(user, function(err) {
      if (err) return res.json(err);
      return res.json({
				message: 'success',
				success: true
			});
    });
  })(req, res, next);
});

// Endpoint to get current user
router.get('/user', function(req, res){
	console.log(req.user);
  res.send(req.user);
})

// Endpoint to logout
router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'ออกจากระบบสำเร็จ')
  res.redirect('/');
  // console.log(req.user);
});

module.exports = router;