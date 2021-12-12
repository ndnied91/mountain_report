const express = require("express"); // express is for routing
const app = express(); //creates the "app" that routes
const bodyParser = require('body-parser');
const axios = require('axios')
const parseRegex = require("regex-parser")
const rp = require('request-promise');
const cheerio = require('cheerio')


let mnt = require('./mountains.js');




const PORT = process.env.port || 3000

let list = []







function finalStr(str){
  let ret = ""
    for (let i =0 ; i < str.length; i++){
      if(str[i+1] !== undefined){
            if( str[i+1] === str[i+1].toUpperCase() && (!parseInt(str[i+1])) && str[i+1] !=='/'){
              ret = ret + str[i] + " "
             }
             else if(str[i] === 'n'){
              ret = ret + str[i] +" "
             }
            else{
              ret = ret + str[i]
            }
      }
      else{
        ret = ret + str[i]
      }
    }
    return ret
}



function cleanString(lifts){
  let str = ""
  for( let i =0 ; i < lifts.length; i++){
    let nums = [0,1,2,3,4,5,6,7,8,9]
     if(lifts[i] === '%'){ str = str + "" }

     else if(parseInt(lifts[i])){
        str = str + parseInt(lifts[i])
     }
      else if(lifts[i] === 't'  && nums.includes( parseInt(lifts[i-1])  ) ){
          str = str +  lifts[i].toUpperCase()
        }
        else if(lifts[i] === lifts[i].toUpperCase()){
          str = str + lifts[i]
        }

        else{
          str = str + lifts[i]}
        }
        return str

}





app.get('/', (req,res)=>{
  let arr = []

    getBlue()
    .then((list) => { arr.push(list) })
    .then((response)=>{ arr.push([1,2,3,4])

    res.send(arr)
    })

})








function cleaner(lifts, letter){ //just for removing duplicate words
  let str = '', count = 0
  lifts.split('').forEach((item, i) => {
    if(item === letter){ count++ }
    if(count > 1){ return str }
      else{ str = str + item }
  });
  return str
}





//       const getBlue = async()=>{
//         return await rp('https://www.skibluemt.com/')
//           .then(function(htmlString){
//             const $ = cheerio.load(htmlString) // loads cheerio in this url so we can use it like jquery
//               let lifts = $("#trailliftsflex").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'').replace(/TrailsOpen/i, "Trails").replace(/LiftsOpen/i, "Lifts")
//               let i,j, temporary, chunk = 2 , data = [];
//                lifts = lifts.match(/[A-Z]+|[^a-z]+/gi);
//
//                for (i = 0,j = lifts.length; i < j; i += chunk) { data.push(lifts.slice(i, i + chunk)) }
//                  return ({"Blue Mountain": data })
//           })
//       }

// var foo = async function() {
//   console.log(await hi());
// };
//
// foo()


// var results = async function() {
//   return await getBlue()
// };
//
// results()
// console.log(results())
//


const getBlue = async()=>{
  return await rp('https://www.skibluemt.com/')
    .then(function(htmlString){
      const $ = cheerio.load(htmlString) // loads cheerio in this url so we can use it like jquery
        let lifts = $("#trailliftsflex").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'').replace(/TrailsOpen/i, "Trails").replace(/LiftsOpen/i, "Lifts")
        let i,j, temporary, chunk = 2 , data = [];
         lifts = lifts.match(/[A-Z]+|[^a-z]+/gi);

         for (i = 0,j = lifts.length; i < j; i += chunk) { data.push(lifts.slice(i, i + chunk)) }
           return ({"Blue Mountain": data })
    })
}


getBlue().then((result) => { console.log(result) })










app.get('/blu', async(req,res)=>{
      rp('https://www.skibluemt.com/')
      .then(function(htmlString){
        const $ = cheerio.load(htmlString) // loads cheerio in this url so we can use it like jquery
          let lifts = $("#trailliftsflex").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'').replace(/TrailsOpen/i, "Trails").replace(/LiftsOpen/i, "Lifts")
          let i,j, temporary, chunk = 2 , data = [];
           lifts = lifts.match(/[A-Z]+|[^a-z]+/gi);

           for (i = 0,j = lifts.length; i < j; i += chunk) {
               data.push(lifts.slice(i, i + chunk))
             }
            res.send({"Blue Mountain": data })
      })
})



app.get('/windham', async(req,res)=>{
  rp('https://www.windhammountain.com/snow-report/')
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

      res.send({"Windham Mountain" : data})

  })
})




app.get('/whiteface', async(req,res)=>{
  rp('https://whiteface.com/mountain/conditions')
  .then(function(htmlString){
    const $ = cheerio.load(htmlString) // loads cheerio in this url so we can use it like jquery
      let lifts = $(".lifts").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'')
      let trails = $(".trails").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'')

       trails = cleaner(trails, 'T').replace('of' , '/')
       lifts = cleaner(lifts, 'L').replace('of' , '/')

       trails = trails.match(/[A-Z]+|[^a-z]+/gi);
       lifts = lifts.match(/[A-Z]+|[^a-z]+/gi);

      res.send({"Whiteface":  [lifts , trails] })
  })
})










app.get('/mnt_creek', async(req,res)=>{
  rp('https://www.mountaincreek.com/mountainreport')
      .then(function (htmlString) {
          const $ = cheerio.load(htmlString)
          let trails = $(".open_trail_lift").children().text().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'').replace(/OpenedTrails/i, "Trails").replace(/OpenedLifts/i, "Lifts")
          trails = trails.match(/[A-Z]+|[^a-z]+/gi);
          res.send({" Creek" : trails })
      })
})




app.get('/mnt_snow', (req,res)=>{

  rp('https://www.mountsnow.com/the-mountain/mountain-conditions/lift-and-terrain-status.aspx')
  .then(function(htmlString){
    const $ = cheerio.load(htmlString) // loads cheerio in this url so we can use it like jquery
    let i,j, temporary, chunk = 2 , data = [];

      let lifts = $(".terrain_summary__tab_main__text").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'').replace(/%/g, '').replace(/TrailsOpen/i, "Trails").replace(/LiftsOpen/i, "Lifts").replace(/TerrainOpen/i, "Terrain")
       lifts = lifts.match(/[A-Z]+|[^a-z]+/gi);

        for (i = 0,j = lifts.length; i < j; i += chunk) {
          data.push(lifts.slice(i, i + chunk))
        }
        res.send({"Mount Snow":  data })
  })
})

app.get('/hunter_mnt', (req,res)=>{
  rp('https://www.huntermtn.com/the-mountain/mountain-conditions/lift-and-terrain-status.aspx')
  .then(function(htmlString){
    const $ = cheerio.load(htmlString) // loads cheerio in this url so we can use it like jquery
    let i,j, temporary, chunk = 2 , data = [];

      let lifts = $(".terrain_summary__tab_main__text").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'').replace(/%/g, '').replace(/TrailsOpen/i, "Trails").replace(/LiftsOpen/i, "Lifts").replace(/TerrainOpen/i, "Terrain")
       lifts = lifts.match(/[A-Z]+|[^a-z]+/gi);

      for (i = 0,j = lifts.length; i < j; i += chunk) {
        data.push(lifts.slice(i, i + chunk)) //sets array into chunks of 3
      }
      res.send({ "Hunter Mountain" : data })
  })

})


app.get('/stowe', async(req,res)=>{

  rp('https://www.stowe.com/the-mountain/mountain-conditions/terrain-and-lift-status.aspx')
  .then(function(htmlString){
      const $ = cheerio.load(htmlString) // loads cheerio in this url so we can use it like jquery
      let i,j, temporary, chunk = 2 , data = [];

      let lifts = $(".terrain_summary__tab_main__text").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'').replace(/%/g, '').replace(/TrailsOpen/i, "Trails").replace(/LiftsOpen/i, "Lifts").replace(/TerrainOpen/i, "Terrain")
       lifts = lifts.match(/[A-Z]+|[^a-z]+/gi);

      for (i = 0,j = lifts.length; i < j; i += chunk) {
        data.push(lifts.slice(i, i + chunk))
      }
        res.send({ "Stowe" : data })
  })
})


app.listen(PORT, ()=> console.log( `server running ${PORT}`))
