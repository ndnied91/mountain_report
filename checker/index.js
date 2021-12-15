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

const keys = require('./config/keys')
mongoose.connect(keys.mongoURI)

app.use(bodyParser.json());

const mods = require("./helperFuncs.js");



const Resort = require('./Models/Resort.js')
const User = require('./Models/User.js')

const PORT = process.env.port || 3000


require('./scheduler.js')


let mnts = require("./scrapers.js");
var weather = require('weather-js');







// const user = new User({
//   name:"name",
//   password: "testing",
//   selection: ['Mountain Creek' , ['Stowe']]
//
// })
// try{
//    user.save()
//
// }catch(err){
//   console.log(err)
// }











app.get('/api/mountains', async (req,res)  =>{
  console.log('call being made...')
  let mountains =  await Resort.find()
    res.send(mountains)
})


app.post('/api/mountains' , async (req,res)=>{
  const mountains = await Resort.find({ 'name': { $in: req.body } });
    res.send(mountains)
})


app.post('/api/login' , async (req,res)=>{
  console.log('HERE')
    console.log(req.body)
    // console.log(req.body.username)

    //get username

    //set up user
    User.findOne({ name: req.body.username }, function (err, result) {
        console.log(result)
    });
})





async function update(){
     // await mnts.updateWindham()
     // await mnts.updateBlueMnt()
     // await mnts.updateStowe()
     // await mnts.updateHunter()
     // await mnts.updateMntSnow()
     // await mnts.updateWindham()
     // await mnts.updateMntCreek()
        await mnts.updateWhiteface()
}

// update()



























app.listen(PORT, ()=> console.log( `server running ${PORT}`))
