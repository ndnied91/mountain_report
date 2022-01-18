

const passport = require('passport')
const passportLocal = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

let User = require('../Models/User.js')

const requireLogin = require('../Middlewares/requireLogin')




module.exports = (app) => {

 //VERIFICATION OF CURRENT USERS
  app.post("/api/login", (req, res, next) => {
    console.log(req.body)
    passport.authenticate("local", (err, user, info) => {

      if (err) throw err;
      if (!user) res.send({user: null , error: 'Unable to verify user'});
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          console.log('VERIFYING USER....')
          console.log('USER FOUND ....')

          let user={
                    user: req.user.name,
                    selection: req.user.selection,
                    id: req.user._id,
                    error: null
                }

                console.log('sending back' , user)
                console.log(user)

          res.send(user);
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
          selection: req.body.selection //can be modified
        });
          await newUser.save();

          let user = { user: newUser.name, selection: req.body.selection, id: newUser._id }
          //we dont want to send back the whole user

          console.log(user)

          res.send(user);
      }
    });
  });



  app.get("/user", (req, res) => {
    // res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
    res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
  });




app.post('/api/user/cookie', (req, res) => {

    User.findOne({ _id: req.body.cookie }, async (err, doc) => {
      if (err) throw err;

      if(!doc){
        // res.send({name: null, selection: null})
        res.send({ user:null, selection: [] , id:null , error: null  });
      }
      else{
        console.log('user found via cookie')
        res.send({ user: doc.name, selection: doc.selection , id: req.body.cookie , error: null  });
        }

      })
});





app.get('/dashboard', requireLogin, (req,res)=>{
  res.sendStatus(200)
})



//this route gets us the ID that is used for the cookie
// app.get('/api/current_user/id', requireLogin,  (req,res)=>{
      // console.log('Cookie' , req.cookies.username);
      // console.log('Session' ,req.session.passport.user);
  //     res.send(req.session.passport.user)
  // })

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
