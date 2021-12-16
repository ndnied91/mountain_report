const express = require("express"); // express is for routing
const app = express(); //creates the "app" that routes
const bodyParser = require('body-parser');
const axios = require('axios')
const parseRegex = require("regex-parser")
const rp = require('request-promise');
const cheerio = require('cheerio')
const mongoose = require('mongoose')
const moment = require('moment-timezone');

let request = require('request');

const keys = require('./Server/config/keys') //config keys
mongoose.connect(keys.mongoURI)



const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");

const session = require("express-session");



app.use(bodyParser.json());

 app.use(bodyParser.urlencoded({ extended: true }));


app.use(
  session({
    secret: 'keys.secretKey',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("mountain"));
app.use(passport.initialize());
app.use(passport.session());

require("./Server/services/passportConfig")(passport);



// const passport = require('passport')
// const passportLocal = require("passport-local").Strategy;
// const bcrypt = require("bcryptjs");



const Resort = require('./Server/Models/Resort.js')


const PORT = process.env.port || 3000


require('./Server/scheduler.js')


let mnts = require("./Server/scrapers.js");
var weather = require('weather-js');



//all auth routes
require("./Server/Auth")(app);




// const user = new User({
//   name:"name",
//   password: "testing",
//   selection: null
//
// })
// try{
//    user.save()
//
// }catch(err){
//   console.log(err)
// }


//
// let zip = '07067'
//   weather.find({search: zip, degreeType: 'F'}, function(err, result) {
//     if(err) console.log(err);
//
//     let forecast = result[0].forecast
//     let current =result[0].current
//
//     console.log(current)
//
//   });
//









app.get('/api/mountains', async (req,res)  =>{
  let mountains =  await Resort.find()
    res.send(mountains)
})


app.post('/api/mountains' , async (req,res)=>{
  const mountains = await Resort.find({ 'name': { $in: req.body } });
    res.send(mountains)
})





// async function update(){
     // await mnts.updateWindham()
     // await mnts.updateBlueMnt()
     // await mnts.updateStowe()
     // await mnts.updateHunter()
     // await mnts.updateMntSnow()
     // await mnts.updateWindham()
     // await mnts.updateMntCreek()
        // await mnts.updateWhiteface()
// }

// update()



























app.listen(PORT, ()=> console.log( `server running ${PORT}`))
