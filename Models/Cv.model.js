const mongoose=require('mongoose')
const CvSchema=new mongoose.Schema({
    pdf:{type:String,require:false},
    Employe:{type:mongoose.Schema.Types.ObjectId,ref:'Employe'},
})

module.exports=mongoose.model("Cv",CvSchema)