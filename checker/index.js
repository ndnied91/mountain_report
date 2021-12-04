const express = require("express"); // express is for routing
const app = express(); //creates the "app" that routes

const bodyParser = require('body-parser');
const axios = require('axios')


const rp = require('request-promise');
const cheerio = require('cheerio')


const PORT = process.env.port || 3000

let list = []


app.get('/', (req,res)=>{
  res.send(list)
})

function cleaner(lifts, letter){

  let str = ''
  let count = 0
  lifts.split('').forEach((item, i) => {
    if(item === letter){ count++ }
    if(count > 1){ return str }
    else{ str = str + item }
  });

  return str
}


app.get('/whiteface', async(req,res)=>{
  rp('https://whiteface.com/mountain/conditions')
  .then(function(htmlString){
    const $ = cheerio.load(htmlString) // loads cheerio in this url so we can use it like jquery
      let lifts = $(".lifts").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'')
      let trails = $(".trails").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'')
      res.send({"Whiteface":  [cleaner(lifts, 'L') , cleaner(trails, 'T')] })
  })

})

app.get('/mnt_creek', async(req,res)=>{

  rp('https://www.mountaincreek.com/mountainreport')
      .then(function (htmlString) {
          const $ = cheerio.load(htmlString) // loads cheerio in this url so we can use it like jquery
          // let trails = $(".open_trail").children().text()
          let trails = $(".open_trail_lift").children().text()
            list.push( {'Moutain Creek': trails})
            res.send(list)
      })
      .catch(function (err) {
          console.log(err)
      });
})









app.listen(PORT, ()=> console.log( `server running ${PORT}`))
