const mongoose=require('mongoose')

const citySchema=new mongoose.Schema({
    city:{type:String},
    users:{type: mongoose.Schema.Types.ObjectId,ref:'user'}
})
module.exports=mongoose.model('city',citySchema,'city');