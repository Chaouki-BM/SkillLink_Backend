const mongoose=require('mongoose')
const ReponseSchema=new mongoose.Schema({
    reponse:{type:Boolean,require:true},
    Question:{type:mongoose.Schema.Types.ObjectId,ref:'Question',required: true},
})

module.exports=mongoose.model("Reponse",ReponseSchema)