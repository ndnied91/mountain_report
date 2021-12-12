const express = require("express"); // express is for routing
const app = express(); //creates the "app" that routes
const bodyParser = require('body-parser');
const axios = require('axios')
const parseRegex = require("regex-parser")
const rp = require('request-promise');
const cheerio = require('cheerio')


var mods = require("./helperFuncs.js");



const PORT = process.env.port || 3000


app.get('/', async (req,res)  =>{
  let arr = []
  // pass an arary of mountains user wants to biew

    arr.push(await getMntCreek())
    arr.push(await getBlue())
    arr.push(await getWindham())
    arr.push(await getWhiteFace())
    arr.push(await getMntSnow())
    arr.push(await getHunter())
    arr.push(await getStowe())

    res.send(arr)

})



const getBlue = async()=>{
  return rp('https://www.skibluemt.com/')
    .then(function(htmlString){
      const $ = cheerio.load(htmlString) // loads cheerio in this url so we can use it like jquery
        let lifts = $("#trailliftsflex").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'').replace(/TrailsOpen/i, "Trails").replace(/LiftsOpen/i, "Lifts")
        let i,j, temporary, chunk = 2 , data = [];
         lifts = lifts.match(/[A-Z]+|[^a-z]+/gi);

         for (i = 0,j = lifts.length; i < j; i += chunk) { data.push(lifts.slice(i, i + chunk)) }
           return ({"Blue Mountain": data })
    })
}


const getMntCreek = () =>{
  return rp('https://www.mountaincreek.com/mountainreport')
      .then(function (htmlString) {
          const $ = cheerio.load(htmlString)
          let trails = $(".open_trail_lift").children().text().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'').replace(/OpenedTrails/i, "Trails").replace(/OpenedLifts/i, "Lifts")
          trails = trails.match(/[A-Z]+|[^a-z]+/gi);
          return ({"Mountain Creek" : trails })
      })
}



const getWindham = () =>{
  return rp('https://www.windhammountain.com/snow-report/')
  .then(function(htmlString){
    const $ = cheerio.load(htmlString) // loads cheerio in this url so we can use it like jquery
    let i,j, temporary, chunk = 2 , data = [];

      let lifts = $(".row.px-5.mt-5").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'').replace(/TRAILS/i, "Trails").replace(/LIFTS/i, "Lifts").replace(/PARKS/i, "Terrain")
      let trails = lifts.match(/[A-Z]+|[^a-z]+/gi);

      const groomed = trails.indexOf('GROOMED'); if (groomed > -1) { trails.splice(groomed, 2); }
      //removes groomed from array
      const acres = trails.indexOf('ACRES'); if (acres > -1) { trails.splice(acres, 2); }
      //removes acres from array
      for (i = 0,j = trails.length; i < j; i += chunk) { data.push(trails.slice(i, i + chunk)) } //splits the array into subarrays

        return({"Windham Mountain" : data})
  })
}



const getWhiteFace = () => {
  return rp('https://whiteface.com/mountain/conditions')
  .then(function(htmlString){
    const $ = cheerio.load(htmlString) // loads cheerio in this url so we can use it like jquery
      let lifts = $(".lifts").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'')
      let trails = $(".trails").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'')

       trails = mods.cleaner(trails, 'T').replace('of' , '/')
       lifts = mods.cleaner(lifts, 'L').replace('of' , '/')

       trails = trails.match(/[A-Z]+|[^a-z]+/gi);
       lifts = lifts.match(/[A-Z]+|[^a-z]+/gi);

      // res.send({"Whiteface":  [lifts , trails] })
      return({"Whiteface":  [lifts , trails] })
  })

}




const getMntSnow = () =>{
  return rp('https://www.mountsnow.com/the-mountain/mountain-conditions/lift-and-terrain-status.aspx')
  .then(function(htmlString){
    const $ = cheerio.load(htmlString) // loads cheerio in this url so we can use it like jquery
    let i,j, temporary, chunk = 2 , data = [];

      let lifts = $(".terrain_summary__tab_main__text").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'').replace(/%/g, '').replace(/TrailsOpen/i, "Trails").replace(/LiftsOpen/i, "Lifts").replace(/TerrainOpen/i, "Terrain")
       lifts = lifts.match(/[A-Z]+|[^a-z]+/gi);

        for (i = 0,j = lifts.length; i < j; i += chunk) {
          data.push(lifts.slice(i, i + chunk))
        }
        // res.send({"Mount Snow":  data })
        return({"Mount Snow":  data })
  })
}

const getHunter = () =>{
  return rp('https://www.huntermtn.com/the-mountain/mountain-conditions/lift-and-terrain-status.aspx')
  .then(function(htmlString){
    const $ = cheerio.load(htmlString) // loads cheerio in this url so we can use it like jquery
    let i,j, temporary, chunk = 2 , data = [];

      let lifts = $(".terrain_summary__tab_main__text").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'').replace(/%/g, '').replace(/TrailsOpen/i, "Trails").replace(/LiftsOpen/i, "Lifts").replace(/TerrainOpen/i, "Terrain")
       lifts = lifts.match(/[A-Z]+|[^a-z]+/gi);

      for (i = 0,j = lifts.length; i < j; i += chunk) {
        data.push(lifts.slice(i, i + chunk)) //sets array into chunks of 3
      }
      // res.send({ "Hunter Mountain" : data })
      return({ "Hunter Mountain" : data })
  })
}



const getStowe = () =>{
  return rp('https://www.stowe.com/the-mountain/mountain-conditions/terrain-and-lift-status.aspx')
  .then(function(htmlString){
      const $ = cheerio.load(htmlString) // loads cheerio in this url so we can use it like jquery
      let i,j, temporary, chunk = 2 , data = [];

      let lifts = $(".terrain_summary__tab_main__text").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'').replace(/%/g, '').replace(/TrailsOpen/i, "Trails").replace(/LiftsOpen/i, "Lifts").replace(/TerrainOpen/i, "Terrain")
       lifts = lifts.match(/[A-Z]+|[^a-z]+/gi);

      for (i = 0,j = lifts.length; i < j; i += chunk) {
        data.push(lifts.slice(i, i + chunk))
      }
        // res.send({ "Stowe" : data })
        return({ "Stowe" : data })
  })
}








// app.get('/blu', async(req,res)=>{
//       rp('https://www.skibluemt.com/')
//       .then(function(htmlString){
//         const $ = cheerio.load(htmlString) // loads cheerio in this url so we can use it like jquery
//           let lifts = $("#trailliftsflex").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'').replace(/TrailsOpen/i, "Trails").replace(/LiftsOpen/i, "Lifts")
//           let i,j, temporary, chunk = 2 , data = [];
//            lifts = lifts.match(/[A-Z]+|[^a-z]+/gi);
//
//            for (i = 0,j = lifts.length; i < j; i += chunk) {
//                data.push(lifts.slice(i, i + chunk))
//              }
//             res.send({"Blue Mountain": data })
//       })
// })


// app.get('/mnt_creek', async(req,res)=>{
//   rp('https://www.mountaincreek.com/mountainreport')
//       .then(function (htmlString) {
//           const $ = cheerio.load(htmlString)
//           let trails = $(".open_trail_lift").children().text().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'').replace(/OpenedTrails/i, "Trails").replace(/OpenedLifts/i, "Lifts")
//           trails = trails.match(/[A-Z]+|[^a-z]+/gi);
//           res.send({"Mountain Creek" : trails })
//       })
// })


// app.get('/windham', async(req,res)=>{
//   rp('https://www.windhammountain.com/snow-report/')
//   .then(function(htmlString){
//     const $ = cheerio.load(htmlString) // loads cheerio in this url so we can use it like jquery
//     let i,j, temporary, chunk = 2 , data = [];
//
//       let lifts = $(".row.px-5.mt-5").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'').replace(/TRAILS/i, "Trails").replace(/LIFTS/i, "Lifts").replace(/PARKS/i, "Terrain")
//       let trails = lifts.match(/[A-Z]+|[^a-z]+/gi);
//
//       const groomed = trails.indexOf('GROOMED'); if (groomed > -1) { trails.splice(groomed, 2); }
//       //removes groomed from array
//       const acres = trails.indexOf('ACRES'); if (acres > -1) { trails.splice(acres, 2); }
//       //removes acres from array
//       for (i = 0,j = trails.length; i < j; i += chunk) { data.push(trails.slice(i, i + chunk)) } //splits the array into subarrays
//
//       res.send({"Windham Mountain" : data})
//
//   })
// })




// app.get('/whiteface', async(req,res)=>{
//   rp('https://whiteface.com/mountain/conditions')
//   .then(function(htmlString){
//     const $ = cheerio.load(htmlString) // loads cheerio in this url so we can use it like jquery
//       let lifts = $(".lifts").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'')
//       let trails = $(".trails").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'')
//
//        trails = mods.cleaner(trails, 'T').replace('of' , '/')
//        lifts = mods.cleaner(lifts, 'L').replace('of' , '/')
//
//        trails = trails.match(/[A-Z]+|[^a-z]+/gi);
//        lifts = lifts.match(/[A-Z]+|[^a-z]+/gi);
//
//       res.send({"Whiteface":  [lifts , trails] })
//   })
// })






// app.get('/mnt_snow', (req,res)=>{
//   rp('https://www.mountsnow.com/the-mountain/mountain-conditions/lift-and-terrain-status.aspx')
//   .then(function(htmlString){
//     const $ = cheerio.load(htmlString) // loads cheerio in this url so we can use it like jquery
//     let i,j, temporary, chunk = 2 , data = [];
//
//       let lifts = $(".terrain_summary__tab_main__text").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'').replace(/%/g, '').replace(/TrailsOpen/i, "Trails").replace(/LiftsOpen/i, "Lifts").replace(/TerrainOpen/i, "Terrain")
//        lifts = lifts.match(/[A-Z]+|[^a-z]+/gi);
//
//         for (i = 0,j = lifts.length; i < j; i += chunk) {
//           data.push(lifts.slice(i, i + chunk))
//         }
//         res.send({"Mount Snow":  data })
//   })
// })

// app.get('/hunter_mnt', (req,res)=>{
//   rp('https://www.huntermtn.com/the-mountain/mountain-conditions/lift-and-terrain-status.aspx')
//   .then(function(htmlString){
//     const $ = cheerio.load(htmlString) // loads cheerio in this url so we can use it like jquery
//     let i,j, temporary, chunk = 2 , data = [];
//
//       let lifts = $(".terrain_summary__tab_main__text").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'').replace(/%/g, '').replace(/TrailsOpen/i, "Trails").replace(/LiftsOpen/i, "Lifts").replace(/TerrainOpen/i, "Terrain")
//        lifts = lifts.match(/[A-Z]+|[^a-z]+/gi);
//
//       for (i = 0,j = lifts.length; i < j; i += chunk) {
//         data.push(lifts.slice(i, i + chunk)) //sets array into chunks of 3
//       }
//       res.send({ "Hunter Mountain" : data })
//   })
// })







app.listen(PORT, ()=> console.log( `server running ${PORT}`))
