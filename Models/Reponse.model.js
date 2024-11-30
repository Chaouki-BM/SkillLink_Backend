
// hatha nl8iwh XD
const mongoose=require('mongoose')
const ReponseSchema=new mongoose.Schema({
    reponse:{type:Boolean,required:true},
    Question:{type:mongoose.Schema.Types.ObjectId,ref:'Question',required: true},
})

module.exports=mongoose.model("Reponse",ReponseSchema)