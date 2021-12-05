const express = require("express"); // express is for routing
const app = express(); //creates the "app" that routes

const bodyParser = require('body-parser');
const axios = require('axios')


const rp = require('request-promise');
const cheerio = require('cheerio')


const PORT = process.env.port || 3000

let list = []






  rp('https://www.windhammountain.com/snow-report/')
  .then(function(htmlString){
    const $ = cheerio.load(htmlString) // loads cheerio in this url so we can use it like jquery
      let lifts = $(".row.px-5.mt-5").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'')
      // console.log(lifts.toLowerCase().split(''))
      let str = lifts.toLowerCase().split('')
      console.log(str)
      let a =''


      for (let i =0 ; i < str.length ; i++){
          if(str[i+1] !== undefined){
            if(str[i] === str[i].toUpperCase() && str[i+1] !== str[i+1].toUpperCase() ){
              a = a + str[i] + ','
            }
            else{
              a = a + str[i]
            }
          }

        else{
          a = a + str[i]
        }
    }
        console.log(a.split(','))

        //go through each one, capitialise letter and spread out
})















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
  res.send(list)
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




app.get('/blu', async(req,res)=>{
  rp('https://www.skibluemt.com/')
  .then(function(htmlString){
    const $ = cheerio.load(htmlString) // loads cheerio in this url so we can use it like jquery
      let lifts = $("#trailliftsflex").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'')
      // res.send({"Blue Moutain": lifts })
  })
})


app.get('/windham', async(req,res)=>{
  rp('https://www.windhammountain.com/snow-report/')
  .then(function(htmlString){
    const $ = cheerio.load(htmlString) // loads cheerio in this url so we can use it like jquery
      let lifts = $(".row.px-5.mt-5").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'')
      res.send({"Windham": lifts })
  })
})




app.get('/whiteface', async(req,res)=>{
    rp('https://whiteface.com/mountain/conditions')
    .then(function(htmlString){
      const $ = cheerio.load(htmlString) // loads cheerio in this url so we can use it like jquery
        let liftOriginal = $(".lifts").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'')
        let trailsOriginal = $(".trails").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'')

        let trailCleaned = cleaner(trailsOriginal, 'T').replace('of' , '/')
        let liftCleaned = cleaner(liftOriginal, 'L').replace('of' , '/')

        let trails = '' , lifts = ''

        for(let i = 0 ; i < trailCleaned.length ; i++){
            if(trailCleaned[i] === 's'){ trails = trails + trailCleaned[i] + " " }
            else{ trails = trails + trailCleaned[i] }
        }

        for(let i = 0 ; i < liftCleaned.length ; i++){
            if(liftCleaned[i] === 's'){ lifts = lifts + liftCleaned[i] + " " }
            else{ lifts = lifts + liftCleaned[i] }
        }
        res.send({"Whiteface":  [lifts , trails] })
    })
})









app.get('/mnt_creek', async(req,res)=>{
  rp('https://www.mountaincreek.com/mountainreport')
      .then(function (htmlString) {
          const $ = cheerio.load(htmlString)
          let trails = $(".open_trail_lift").children().text().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'')

          let str = finalStr(trails)
          let s = '' // removes unncessary text
          str.split(' ').forEach((item, i) => { if(item !== 'ed'){ s = s + item + " " } })
          res.send({"Mountain Creek": s})
      })
})




app.get('/mnt_snow', (req,res)=>{
    rp('https://www.mountsnow.com/the-mountain/mountain-conditions/lift-and-terrain-status.aspx')
    .then(function(htmlString){
      const $ = cheerio.load(htmlString) // loads cheerio in this url so we can use it like jquery
        let lifts = $(".terrain_summary__tab_main__text").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'')
        let str = cleanString(lifts)

        let ret = ""
          for (let i =0 ; i < str.length; i++){
            if(str[i+1] !== undefined){
                  if( str[i+1] === str[i+1].toUpperCase() && (!parseInt(str[i+1])) && str[i+1] !=='/'){
                    if( str[i+1] == '0'){ ret = ret + str[i] }
                        else{ ret = ret + str[i] + " " }

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

          let i,j, temporary, chunk = 3 , data = [];
          for (i = 0,j = ret.split(' ').length; i < j; i += chunk) {
            data.push(ret.split(' ').slice(i, i + chunk))
          }


        res.send({"Mount Snow":  data })
    })
})

app.get('/hunter_mnt', (req,res)=>{
  rp('https://www.huntermtn.com/the-mountain/mountain-conditions/lift-and-terrain-status.aspx')
  .then(function(htmlString){
    const $ = cheerio.load(htmlString) // loads cheerio in this url so we can use it like jquery
      let lifts = $(".terrain_summary__tab_main__text").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'')

      let fin = finalStr(cleanString(lifts)) //nested function that cleans up strings
      let i,j, temporary, chunk = 3 , data = [];
      for (i = 0,j = fin.split(' ').length; i < j; i += chunk) {
        data.push(fin.split(' ').slice(i, i + chunk)) //sets array into chunks of 3
      }
      res.send({ "Hunter Mountain" : data })
  })
})


app.get('/stowe', async(req,res)=>{
  rp('https://www.stowe.com/the-mountain/mountain-conditions/terrain-and-lift-status.aspx')
  .then(function(htmlString){
    const $ = cheerio.load(htmlString) // loads cheerio in this url so we can use it like jquery
      let lifts = $(".terrain_summary__tab_main__text").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'').split('')

      let fin = finalStr(cleanString(lifts)) //nested function that cleans up strings
      let i,j, temporary, chunk = 3 , data = [];
      for (i = 0,j = fin.split(' ').length; i < j; i += chunk) {
        data.push(fin.split(' ').slice(i, i + chunk))
      }
      res.send({ "Stowe" : data })
  })
})










app.listen(PORT, ()=> console.log( `server running ${PORT}`))
