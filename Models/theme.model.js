const mongoose=require('mongoose')
 const themeSchema=new mongoose.Schema({
  motCle:{type:String,require:true} ,
  offer:{type:mongoose.Schema.Types.ObjectId,ref:'Offer'},
 })

module.exports=mongoose.model("theme",themeSchema)