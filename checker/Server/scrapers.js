const express = require("express"); // express is for routing
const app = express(); //creates the "app" that routes
const bodyParser = require('body-parser');
const axios = require('axios')
const parseRegex = require("regex-parser")
const rp = require('request-promise');
const cheerio = require('cheerio')

const mongoose = require('mongoose')
const moment = require('moment-timezone');

const keys = require('./config/keys')
mongoose.connect(keys.mongoURI)

var mods = require("./helperFuncs.js");
var weather = require('weather-js');


const Report = require('./Models/Resort.js')

// https://weatherjs.com

// let zip = '07067'
//   weather.find({search: zip, degreeType: 'F'}, function(err, result) {
//     if(err) console.log(err);
//
//     let forecast = result[0].forecast
//     let current =result[0].current
//
//     console.log(forecast)
//   });














//JUST FOR SCRAPING AND DATA GATHERING
const updateBlueMnt = async()=>{
  return rp('https://www.skibluemt.com/')
    .then(function(htmlString){
      const $ = cheerio.load(htmlString) // loads cheerio in this url so we can use it like jquery
        let lifts = $("#trailliftsflex").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'').replace(/TrailsOpen/i, "trails").replace(/LiftsOpen/i, "lifts")

         lifts = lifts.match(/[A-Z]+|[^a-z]+/gi);

         async function update(){
           const filter = { name: 'Blue Mountain' };
           const update = {
             trails: lifts[1],
             lifts: lifts[3],
             link : 'https://www.skibluemt.com/',
             report: 'https://www.skibluemt.com',
             tickets: 'https://www.skibluemt.com/winter-sports/skiing-snowboarding/purchase-lift-tickets/',
             timestamp : moment.tz(Date.now(), "America/New_York").format()
            };
              await Report.findOneAndUpdate(filter, update);
      }

      update()


////update forcast area
      async function updateForcast(name, weather){
        console.log(weather)
        const filter = { name};
        const update = { weather };
            await Report.findOneAndUpdate(filter, update);
        }

         weather.find({search: '18071', degreeType: 'F'}, async function(err, result) {
          if(err) console.log(err);
          if(result){

            let current = {
              temperature : result[0].current.temperature, skytext : result[0].current.skytext, date : result[0].current.date,
              feelslike : result[0].current.feelslike, shortday : result[0].current.shortday, imageUrl : result[0].current.imageUrl
            }

            let forecast = result[0].forecast

              updateForcast( 'Blue Mountain',  [{current , forecast}])
          }
        });
////update forcast area


    })
}



const updateMntCreek = () =>{
  return rp('https://www.mountaincreek.com/mountainreport')
      .then(function (htmlString) {
          const $ = cheerio.load(htmlString)
          let trails = $(".open_trail_lift").children().text().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'').replace(/OpenedTrails/i, "trails").replace(/OpenedLifts/i, "lifts")
          trails = trails.match(/[A-Z]+|[^a-z]+/gi);
          // return ({"Mountain Creek" : trails })


          async function update(){
            const filter = { name: 'Mountain Creek' };
            const update = {
              trails: trails[1], lifts: trails[3],
              link : 'https://www.mountaincreek.com/mountainreport',
              report: 'https://www.mountaincreek.com/5dayforecast',
              tickets: "https://mountaincreek.snowcloud.store/menu/92bc1c3f-a4cf-4e29-80b7-40f80840494f",
              timestamp : moment.tz(Date.now(), "America/New_York").format()
             };
               const res = await Report.findOneAndUpdate(filter, update);

               console.log(res)

               if( res === null){
                 //CREATES A NEW ENTRY
                    const mnt = new Report({
                      name:"Mountain Creek",
                      trails: trails[1],
                      lifts: trails[3],
                      report : 'https://www.mountaincreek.com/mountainreport',
                      timestamp : moment.tz(Date.now(), "America/New_York").format()
                    })
                    try{
                       mnt.save()

                  }catch(err){
                      console.log(err)
                  }
                      // return ({"Blue Mountain": data })
               }
       }

       update()

       ////update forcast area
             async function updateForcast(name, weather){
               console.log(weather)
               const filter = { name};
               const update = { weather };
                   await Report.findOneAndUpdate(filter, update);
               }

                weather.find({search: '07462', degreeType: 'F'}, async function(err, result) {
                 if(err) console.log(err);
                 if(result){

                   let current = {
                     temperature : result[0].current.temperature, skytext : result[0].current.skytext, date : result[0].current.date,
                     feelslike : result[0].current.feelslike, shortday : result[0].current.shortday, imageUrl : result[0].current.imageUrl
                   }

                   let forecast = result[0].forecast

                     updateForcast( 'Mountain Creek',  [{current , forecast}])
                 }
               });
       ////update forcast area
      })
}





const updateWindham = () =>{
  return rp('https://www.windhammountain.com/snow-report/')
  .then(function(htmlString){
    const $ = cheerio.load(htmlString) // loads cheerio in this url so we can use it like jquery

      let lifts = $(".row.px-5.mt-5").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'').replace(/TRAILS/i, "Trails").replace(/LIFTS/i, "Lifts").replace(/PARKS/i, "Terrain")
      let trails = lifts.match(/[A-Z]+|[^a-z]+/gi);

      const groomed = trails.indexOf('GROOMED'); if (groomed > -1) { trails.splice(groomed, 2); }
      //removes groomed from array
      const acres = trails.indexOf('ACRES'); if (acres > -1) { trails.splice(acres, 2); }
      //removes acres from array


      async function update(){
        const filter = { name: 'Windham Mountain' };
        const update = {
          trails: `${trails[1]}/54`,
          lifts: `${trails[3]}/11` ,
          terrain: trails[5],
          link : 'https://www.windhammountain.com//',
          report: 'https://www.windhammountain.com/snow-report/',
          timestamp : moment.tz(Date.now(), "America/New_York").format()
         };
            await Report.findOneAndUpdate(filter, update);
        }

        update()

        ////update forcast area
              async function updateForcast(name, weather){
                console.log(weather)
                const filter = { name};
                const update = { weather };
                    await Report.findOneAndUpdate(filter, update);
                }

                 weather.find({search: '12496', degreeType: 'F'}, async function(err, result) {
                  if(err) console.log(err);
                  if(result){

                    let current = {
                      temperature : result[0].current.temperature, skytext : result[0].current.skytext, date : result[0].current.date,
                      feelslike : result[0].current.feelslike, shortday : result[0].current.shortday, imageUrl : result[0].current.imageUrl
                    }

                    let forecast = result[0].forecast

                      updateForcast( 'Windham Mountain',  [{current , forecast}])
                  }
                });
        ////update forcast area
  })
}



const updateWhiteface = () => {
  return rp('https://whiteface.com/mountain/conditions')
  .then(function(htmlString){
    const $ = cheerio.load(htmlString) // loads cheerio in this url so we can use it like jquery
      let lifts = $(".lifts").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'')
      let trails = $(".trails").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'')

       trails = mods.cleaner(trails, 'T').replace('of' , '/')
       lifts = mods.cleaner(lifts, 'L').replace('of' , '/')

       trails = trails.match(/[A-Z]+|[^a-z]+/gi);
       lifts = lifts.match(/[A-Z]+|[^a-z]+/gi);

       async function update(){
         const filter = { name: 'Whiteface Mountain' };
         const update = {
           trails: trails[1], lifts: lifts[1],
           link : 'https://whiteface.com/mountain/',
           report: "https://whiteface.com/mountain/conditions/",
           tickets: 'https://whiteface.com/tickets-passes/',
           ticekts: 'https://shop.windhammountain.com/s/lift-passes/c/lift-ticket',
           timestamp : moment.tz(Date.now(), "America/New_York").format()
          };
             await Report.findOneAndUpdate(filter, update);
         }

         update()

         ////update forcast area
               async function updateForcast(name, weather){

                 console.log(weather)
                 const filter = { name};
                 const update = { weather };
                     await Report.findOneAndUpdate(filter, update);
                 }

                  ///
                  weather.find({search: '12997', degreeType: 'F'}, async function(err, result) {
                   if(err) console.log(err);
                   if(result){
                     console.log('result is..')
                     console.log(result[0].forecast)
                     let current = {
                       temperature : result[0].current.temperature, skytext : result[0].current.skytext, date : result[0].current.date,
                       feelslike : result[0].current.feelslike, shortday : result[0].current.shortday, imageUrl : result[0].current.imageUrl
                     }

                     let forecast = result[0].forecast

                       updateForcast( 'Whiteface Mountain',  [{current , forecast}])
                   }
                 });
         ////update forcast area
   })

}





const updateMntSnow = () =>{
  return rp('https://www.mountsnow.com/the-mountain/mountain-conditions/lift-and-terrain-status.aspx')
  .then(function(htmlString){
    const $ = cheerio.load(htmlString) // loads cheerio in this url so we can use it like jquery

      let lifts = $(".terrain_summary__tab_main__text").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'').replace(/%/g, '').replace(/TrailsOpen/i, "Trails").replace(/LiftsOpen/i, "Lifts").replace(/TerrainOpen/i, "Terrain")
       lifts = lifts.match(/[A-Z]+|[^a-z]+/gi);


        async function update(){
          const filter = { name: 'Mount Snow' };
          const update = {
            trails: lifts[4],
            lifts: lifts[0],
            terrain: lifts[2],
            link: "https://www.mountsnow.com/the-mountain/mountain-conditions/lift-and-terrain-status.aspx",
            ticekts: 'https://www.mountsnow.com/plan-your-trip/lift-access/tickets.aspx',
            report: "https://www.mountsnow.com/the-mountain/mountain-conditions/snow-and-weather-report.aspx",
            timestamp : moment.tz(Date.now(), "America/New_York").format()
           };
              await Report.findOneAndUpdate(filter, update);
          }

          update()

          ////update forcast area
                async function updateForcast(name, weather){
                  console.log(weather)
                  const filter = { name};
                  const update = { weather };
                      await Report.findOneAndUpdate(filter, update);
                  }

                   weather.find({search: '05356', degreeType: 'F'}, async function(err, result) {
                    if(err) console.log(err);
                    if(result){

                      let current = {
                        temperature : result[0].current.temperature, skytext : result[0].current.skytext, date : result[0].current.date,
                        feelslike : result[0].current.feelslike, shortday : result[0].current.shortday, imageUrl : result[0].current.imageUrl
                      }

                      let forecast = result[0].forecast

                        updateForcast( 'Mount Snow',  [{current , forecast}])
                    }
                  });
          ////update forcast area

  })
}






const updateHunter = () =>{
  return rp('https://www.huntermtn.com/the-mountain/mountain-conditions/lift-and-terrain-status.aspx')
  .then(function(htmlString){
    const $ = cheerio.load(htmlString) // loads cheerio in this url so we can use it like jquery

      let lifts = $(".terrain_summary__tab_main__text").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'').replace(/%/g, '').replace(/TrailsOpen/i, "Trails").replace(/LiftsOpen/i, "Lifts").replace(/TerrainOpen/i, "Terrain")
       lifts = lifts.match(/[A-Z]+|[^a-z]+/gi);


       async function update(){
         const filter = { name: 'Hunter Mountain' };
         const update = {
           trails: lifts[4],
           lifts: lifts[0],
           terrain: lifts[2],
           link: "https://www.huntermtn.com/the-mountain/mountain-conditions/lift-and-terrain-status.aspx",
           tickets: "https://www.huntermtn.com/plan-your-trip/lift-access/tickets.aspx",
           report: "https://www.huntermtn.com/the-mountain/mountain-conditions/snow-and-weather-report.aspx",
           timestamp : moment.tz(Date.now(), "America/New_York").format()
          };

             await Report.findOneAndUpdate(filter, update);
         }

         update() //for everything other than weather

               async function updateForcast(name, weather){
                 console.log(weather)
                 const filter = { name};
                 const update = { weather };
                     await Report.findOneAndUpdate(filter, update);
                 }

                  weather.find({search: '12442', degreeType: 'F'}, async function(err, result) {
                   if(err) console.log(err);
                   if(result){

                     let current = {
                       temperature : result[0].current.temperature, skytext : result[0].current.skytext, date : result[0].current.date,
                       feelslike : result[0].current.feelslike, shortday : result[0].current.shortday, imageUrl : result[0].current.imageUrl
                     }

                     let forecast = result[0].forecast

                       updateForcast( 'Hunter Mountain',  [{current , forecast}])
                   }
                 });

  })
}





const updateStowe = () =>{
  return rp('https://www.stowe.com/the-mountain/mountain-conditions/terrain-and-lift-status.aspx')
  .then(function(htmlString){
      const $ = cheerio.load(htmlString) // loads cheerio in this url so we can use it like jquery
      // let i,j, temporary, chunk = 2 , data = [];

      let lifts = $(".terrain_summary__tab_main__text").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'').replace(/%/g, '').replace(/TrailsOpen/i, "Trails").replace(/LiftsOpen/i, "Lifts").replace(/TerrainOpen/i, "Terrain")
       lifts = lifts.match(/[A-Z]+|[^a-z]+/gi);

        async function update(){
          const filter = { name: 'Stowe' };
          const update = {
            trails: lifts[2],
            lifts: lifts[4],
            terrain: lifts[0],
            link: "https://www.stowe.com/the-mountain/mountain-conditions/terrain-and-lift-status.aspx",
            ticekts: "https://www.stowe.com/plan-your-trip/lift-access/tickets.aspx",
            report: "https://www.stowe.com/the-mountain/mountain-conditions/snow-and-weather-report.aspx",
            timestamp : moment.tz(Date.now(), "America/New_York").format()
           };
              await Report.findOneAndUpdate(filter, update);
          }

          update()

          ////update forcast area
                async function updateForcast(name, weather){
                  console.log(weather)
                  const filter = { name};
                  const update = { weather };
                      await Report.findOneAndUpdate(filter, update);
                  }

                   weather.find({search: '05672', degreeType: 'F'}, async function(err, result) {
                    if(err) console.log(err);
                    if(result){

                      let current = {
                        temperature : result[0].current.temperature, skytext : result[0].current.skytext, date : result[0].current.date,
                        feelslike : result[0].current.feelslike, shortday : result[0].current.shortday, imageUrl : result[0].current.imageUrl
                      }

                      let forecast = result[0].forecast

                        updateForcast( 'Stowe',  [{current , forecast}])
                    }
                  });
          ////update forcast area
   })
}




module.exports = {updateBlueMnt , updateMntCreek , updateWindham , updateWhiteface , updateMntSnow , updateHunter, updateStowe}





//   const mnt = new Report({
//     name:"Stowe",
//     trails: lifts[2],
//     lifts: lifts[4],
//     terrain: lifts[0],
//     timestamp : moment.tz(Date.now(), "America/New_York").format()
//   })
//   try{
//      mnt.save()
//
// }catch(err){
//     console.log(err)
// }
