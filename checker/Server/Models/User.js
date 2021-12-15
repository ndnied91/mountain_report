const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
  name: String,
  password: String,
  selection: Array,
})

module.exports = mongoose.model('user', userSchema) //model class
