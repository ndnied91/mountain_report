

const passport = require('passport')
const passportLocal = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

let User = require('../Models/User.js')

const requireLogin = require('../Middlewares/requireLogin')




module.exports = (app) => {

// app.use(cookiesMiddleware())

  //  ======routing ========


  app.post("/api/login", (req, res, next) => {
    console.log(req.body)
    passport.authenticate("local", (err, user, info) => {
      // console.log('user is...')
      // console.log(user)
      if (err) throw err;
      if (!user) res.send("No User Exists");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send(req.user.name);
        });
      }
    })(req, res, next);
  });



  app.post("/api/user", async (req, res) => {

    User.findOne({ name: req.body.username }, async (err, doc) => {
      if (err) throw err;
      if (doc) res.send("User Already Exists");

      if (!doc) {
        const newUser = new User({
          name: req.body.username,
          password:  await bcrypt.hash(req.body.password, 10) ,
          selection: null //can be modified
        });
          await newUser.save();
          res.send(newUser.name);
      }
    });
  });


  app.get("/user", (req, res) => {
    // res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
    res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
  });



app.get('/dashboard', requireLogin, (req,res)=>{
  res.sendStatus(200)
})



//this route gets us the ID that is used for the cookie
app.get('/api/current_user/id', requireLogin,  (req,res)=>{
      // console.log('Cookie' , req.cookies.username);
      // console.log('Session' ,req.session.passport.user);
      res.send(req.session.passport.user)
  })

//this route is used for getting the current users name
  // app.get('/api/current_user/user', requireLogin,  (req,res)=>{
  //       res.send(req.user)
  //       // res.send(req.user.username)
  //   })
  //



  app.get('/api/logout', (req,res)=>{
      req.logout()
      res.redirect('/')
    })


}
