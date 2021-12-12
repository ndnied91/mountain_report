const mongoose = require('mongoose')
const {Schema} = mongoose

const resortSchema = new Schema({
  trails: String,
  lifts: String ,
  terrain: String,
  timestamp: String,
})

module.exports = mongoose.model('resort', resortSchema) //model class
