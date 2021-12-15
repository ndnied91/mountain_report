
const mongoose = require('mongoose')
const schedule = require('node-schedule');
const keys = require('./config/keys')
const rule = new schedule.RecurrenceRule();


let mnts = require("./scrapers.js");




mongoose.connect(keys.mongoURI)

console.log(`Current time: ${new Date()}`);



schedule.scheduleJob('31 * * * *', async function(){
    await mnts.updateWhiteface()
    await mnts.updateBlueMnt()
    console.log('updating whiteface and blue mountain')
 });

 schedule.scheduleJob('44 * * * *', async function(){
     await mnts.updateWindham()
     await mnts.updateMntSnow()
     console.log('updating windham / mnt snow')
  });



  schedule.scheduleJob('44 * * * *', async function(){
      await mnts.updateHunter()
      await mnts.updateStowe()
      await mnts.updateMntCreek()
      console.log('updating hunter/ stowe / creek')
   });


   const update= async() =>{
     console.log('upating whiteface')
    await mnts.updateWhiteface()
   }

   update()
