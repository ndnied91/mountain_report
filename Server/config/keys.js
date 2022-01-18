



if(process.env.NODE_ENV ===  'production'){
  //return the production set of keys
  console.log('production')
  module.exports = require('./prod')

}else{
  //we are in the developement - return correct keys
  //this will be local
  console.log('local')
  module.exports = require('./dev')
  //show no longer be visibe
}
