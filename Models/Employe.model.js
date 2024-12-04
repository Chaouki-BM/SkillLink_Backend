const mongoose=require('mongoose')
const EmployeSchema=new mongoose.Schema({
  email: {type:String,require:true, unique: true},
  password: {type:String,require:true},
  etat: {type:Boolean,default:false}, 
  avatar: {type:String,require:false},
  nom: {type:String,require:true},
  prenom: {type:String,require:true},
  role: {type:String,default:"employe"},
  posteT:{type:String,require:true},
  NumT:{type:String,require:true},
},{
    timestamps:true
});

EmployeSchema.virtual('Cv', {
  ref: 'Cv',
  localField: '_id',
  foreignField: 'Employe'
});

EmployeSchema.set('toObject', { virtuals: true });
EmployeSchema.set('toJSON', { virtuals: true });

module.exports=mongoose.model('Employe',EmployeSchema)