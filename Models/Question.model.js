const mongoose=require('mongoose')
const QuestionSchema=new mongoose.Schema({
    titre:{type:String,require:true},
    reponse:{type:Boolean,require:true},
    offer:{type:mongoose.Schema.Types.ObjectId,ref:'Offer'},
})

module.exports=mongoose.model("Question",QuestionSchema)