const mongoose=require('mongoose')

const userSchema = new mongoose.Schema({
  'email':{type:String},
  'username':{type:String},
  'password':{type:String}, 
  'googleId':{type:String},
})

module.exports=mongoose.model('user',userSchema,'user');