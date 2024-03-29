

let User = require('../Models/User.js')

const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      console.log('ii passport config')
      // console.log(username, password)
      User.findOne({ name: username }, (err, user) => {
            // console.log('looking for match')
            // console.log('user name is ', username)
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {

          console.log(`found user${user}, comparing passwords`)
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {

            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        username: user.username,
      };
      cb(err, userInformation);
    });
  });
};
