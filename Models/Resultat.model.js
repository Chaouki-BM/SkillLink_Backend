const mongoose=require('mongoose')
const ResultatSchema=new mongoose.Schema({
    offer:{type:mongoose.Schema.Types.ObjectId,ref:'Offer'},
    Employe:{type:mongoose.Schema.Types.ObjectId,ref:'Employe'},
    score:{type:Number,require:true},
    etat:{type:String ,default:"en attend"}
})
module.exports=mongoose.model("Resultat",ResultatSchema)