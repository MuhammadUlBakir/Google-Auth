const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session'); 
const { Logout, Userdata, Failure, Success } = require('../Controller/Authredirect');
const { CreatePass, Authuser } = require('../Controller/Userpass');
const {Adduser, CheckUser, Signin} = require("../Controller/Checkuser") 
//-----------------------
const router = express();
//-----------------------
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(cors());
router.use(morgan('dev'));
// Initialize passport before the session middleware
router.use(passport.initialize());
router.use(session({
    secret: 'devjamali',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
}));
// Use passport session middleware after the session middleware
router.use(passport.session());
//-----------------------
require("../Controller/GoogleAuth");
require("../db/Dbconnection");
//-----------------------
router.get("/auth/google/callback", passport.authenticate('google', {
    successRedirect: '/api/success',
    failureRedirect: '/failure'
}));
router.get("/google", passport.authenticate('google', {
    scope: ['email', 'profile']
}));
router.post("/Adduser" , Adduser)
router.get('/success', Success);
router.post('/failure', Failure);
router.get("/logout" , Logout);
router.post("/checkuser", CheckUser );
router.post("/createpass", CreatePass);
router.post("/signin", Signin);
router.post("/authuser", Authuser);
//-----------------------
module.exports = router;
