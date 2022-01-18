module.exports = (req,res,next) =>{

  if(!req.user){
    return res.status(200).send({error: 'You must log in'})
  }
    console.log('logged in ->')
    next()
    //if user is logged in, go on
}
