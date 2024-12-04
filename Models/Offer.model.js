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

// Virtual field to populate related Resultats
OfferSchema.virtual('resultats', {
    ref: 'Resultat',
    localField: '_id',
    foreignField: 'offer'
});

// Enable virtuals in JSON and Object output
OfferSchema.set('toObject', { virtuals: true });
OfferSchema.set('toJSON', { virtuals: true });
module.exports=mongoose.model("Offer",OfferSchema)