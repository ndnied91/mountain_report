
const mongoose = require('mongoose')
const schedule = require('node-schedule');
const keys = require('./config/keys')
const rule = new schedule.RecurrenceRule();


let mnts = require("./scrapers.js");




mongoose.connect(keys.mongoURI)

console.log(`Current time: ${new Date()}`);



// const update= async() =>{
//   console.log('upating all')
//   await mnts.updateBlueMnt()
//   await mnts.updateWhiteface()
//   await mnts.updateWindham()
//   await mnts.updateMntSnow()
//   await mnts.updateHunter()
//   await mnts.updateStowe()
//   await mnts.updateMntCreek()
// }
// //
// update()

    // await mnts.updateBlueMnt()


schedule.scheduleJob('55 * * * *', async function(){
    await mnts.updateWhiteface()
    await mnts.updateBlueMnt()
    await mnts.updateWindham()
    await mnts.updateMntSnow()
    await mnts.updateHunter()
    await mnts.updateStowe()
    await mnts.updateMntCreek()
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

   //
