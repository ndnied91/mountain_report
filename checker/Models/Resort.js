const mongoose = require('mongoose')
const {Schema} = mongoose

const resortSchema = new Schema({
  name: String,
  trails: String,
  lifts: String ,
  terrain: String,
  link: String,
  report: String,
  weather: Array,
  timestamp: String,
})

module.exports = mongoose.model('resort', resortSchema) //model class
