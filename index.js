const express = require("express"); // express is for routing
const app = express(); //creates the "app" that routes
const bodyParser = require('body-parser');
const axios = require('axios')
const parseRegex = require("regex-parser")
const rp = require('request-promise');
const cheerio = require('cheerio')
const mongoose = require('mongoose')
const moment = require('moment-timezone');
const path = require('path');


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

const Resort = require('./Server/Models/Resort.js')
let User = require('./Server/Models/User.js')


const PORT = process.env.PORT || 3000

require('./Server/scheduler.js')


let mnts = require("./Server/scrapers.js");
var weather = require('weather-js');


//all auth routes
require("./Server/Auth")(app);





async function forceUpdate(mountains){
    switch (mountains) {
      case 'Mountain Creek':
        return await mnts.updateMntCreek()
        break;

    case 'Windham Mountain':
        return await mnts.updateWindham()
          break;
    case 'Blue Mountain':
        return  await mnts.updateBlueMnt()
          break;

    case 'Stowe':
        return  await mnts.updateStowe()
          break;

    case 'Hunter Mountain':
        return await mnts.updateHunter()
          break;

    case 'Mount Snow':
        return await mnts.updateMntSnow()
          break;

    case 'Whiteface Mountain':
        return await mnts.updateWhiteface()
          break;
        default:
        return null
    }
}
////////



async function updateMntSelection(id, mnts){
  const filter = { _id: id };
  const update = { selection: mnts };
     await User.findOneAndUpdate(filter, update);
}



app.get('/api/mountains', async (req,res)  =>{
  let mountains =  await Resort.find()
    res.send(mountains)
})


app.post('/api/mountains' , async (req,res)=>{

  console.log('user selection coming form selection')


  // updateMntSelection(req.body.id, req.body.mnts) //this will update the mnts
  //take this and update the user

  //find user , and update the mountain variable


  if(req.body.id === null){
      res.send(await Resort.find() )
  }
  else{
    console.log('updating user selection')
    await updateMntSelection(req.body.id, req.body.values)

    const mountains = await Resort.find({ 'name': { $in: req.body.values } });
    res.send(mountains)
  }
})




app.post('/api/mountains/:id', async (req,res)  =>{

    let mountain = req.params.id
    let selection = req.body.selection

      await forceUpdate(mountain)

      if(selection.length > 0){
        const mountains = await Resort.find({ 'name': { $in: selection } });
        res.send(mountains)
        //get the specific users mountains
      }
      else{
        let mountains =  await Resort.find()
          res.send(mountains)
      }

      //IF USER IS NOT NULL RETURN SPEFICIC LIST
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








// this makes sure express behaves correctly
if (process.env.NODE_ENV === 'production') {
  console.log('RUNNING IN PROD')
  // Express will serve up production assets
  // like our main.js file, or main.css file!
    app.use(express.static('client/build'));

      app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
      });
}


















app.listen(PORT, ()=> console.log( `server running ${PORT}`))
