const mongoose=require('mongoose')
const EnterpriseSchema=new mongoose.Schema({
  email: {type:String,require:true, unique: true},
  password: {type:String,require:true},
  role: {type:String,default:"entreprise"},
  etat: {type:Boolean,default:false}, 
  avatar: {type:String,require:false},
  nom: {type:String,require:true},
  description: {type:String,require:true}, 
  address: {type:String,require:true},
  siteW:{type:String,require:true},
  CodePostal:{type:String,require:true}
},{
    timestamps:true
})
module.exports=mongoose.model('Enterprise',EnterpriseSchema)