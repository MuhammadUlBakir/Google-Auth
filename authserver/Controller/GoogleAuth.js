const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const jwt = require('jsonwebtoken');
const Userschema = require('../db/UserSchema');
const storage = require('node-persist');

//------------------
passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/api/auth/google/callback",
    passReqToCallback   : true
  },
  async function (request, accessToken, refreshToken, profile, done) {
    const email = profile.email;
    const displayName = profile.displayName;
    const Userpicture = profile.picture;
    const userid = profile.id
      if (userid) {
          const token = jwt.sign(userid, process.env.Seckey);
          if (token) {
              const Checkuser = await Userschema.findOne({ email: email });
              if (Checkuser) {
                const Updatetoken = await Userschema.findOneAndUpdate({ _id: Checkuser._id }, { $set: { token: token } }, { new: true });
                console.log(`Usertoken --->  ${token}`);
                  if (Updatetoken) {
                      console.log("Token Change")
                      storage.setItem("useremail", JSON.stringify(Updatetoken._id));
                }
              } else {
                const SaveUserdata = new Userschema({
                    username: displayName,
                    email: email,
                    userimg: Userpicture,
                    token: token
                });
                  const savedt = await SaveUserdata.save();
                  storage.setItem("useremail", savedt.email);
                console.log(savedt);
              }
          }

      }
    //   console.log(user);
      done(null, profile);
      
  }
));
//---------------
passport.serializeUser((user, done) => {
    done(null, user);
});
//---------------
passport.deserializeUser((user, done) => {
    done(null, user);
})