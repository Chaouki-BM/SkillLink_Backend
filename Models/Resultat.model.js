const mongoose=require('mongoose')
const ResultatSchema=new mongoose.Schema({
    offer:{type:mongoose.Schema.Types.ObjectId,ref:'Offer'},
    Employe:{type:mongoose.Schema.Types.ObjectId,ref:'Employe'},
    score:{type:String,require:true},
    reason:{type:String ,require:false}
})
module.exports=mongoose.model("Resultat",ResultatSchema)