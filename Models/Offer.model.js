const mongoose=require("mongoose")
const OfferSchema = new mongoose.Schema({
    description:{type:String,require:true},
    titre:{type:String,require:true},
    experience:{type:String,require:true},
    Contract:{type:String,require:true},
    lieu:{type:String,require:true},
    mession:{type:String,require:true},
    exigence:{type:String,require:true},
    Status:{type:Boolean,default:true},
    Enterprise:{type:mongoose.Schema.Types.ObjectId,ref:'Enterprise'},
},{
    timestamps:true
});

module.exports=mongoose.model("Offer",OfferSchema)