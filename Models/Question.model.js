const mongoose=require('mongoose')
const QuestionSchema=new mongoose.Schema({
    titre:{type:String,require:true},
    CorrectReponse:{type:Boolean,require:true},
    offer:{type:mongoose.Schema.Types.ObjectId,ref:'Offer',require:true},
})

module.exports=mongoose.model("Question",QuestionSchema)