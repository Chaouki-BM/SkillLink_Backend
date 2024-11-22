const Question=require("../Models/Question.model")
const Entreprise=require('../Models/Entreprise.model')
const AddQuestion=async(req,res)=>{
try{
    const userId = req.user.exist._id; 
    const enterprise = await Entreprise.findById(userId);
    if (!enterprise || enterprise.role!=="entreprise") {
        return res.status(404).json({ message: 'Enterprise not found' });
    }

    const {titre,reponse,idOffer}=req.body;
    const newQ=new Question({
        titre,
        reponse,
        offer:idOffer,
    })
    await newQ.save()
    return res.status(201).json({
        success:true,
        message:"Question created successfully"
    })
}catch(err){
    res.status(500).json({
        message:"Internal server error!"
    })
}
}
const DeleteQuestion=async(req,res)=>{
    try{
        const userId = req.user.exist._id; 
        console.log(userId);
        
        const enterprise = await Entreprise.findById(userId);
        if (!enterprise || enterprise.role!=="entreprise") {
            return res.status(404).json({ message: 'Enterprise not found' });
        }
        const {id,idOffer}=req.body;
        const DeleteQuestion=await Question.deleteOne({offer:idOffer,_id:id})
        if(DeleteQuestion.deletedCount!=0)
          return res.status(200).json({
        success:true,
        message:"Question deleted successfully"
        })

        res.status(200).json({
            success:false,
            message:"Question not found!"
            })
        
    }catch(err){
        res.status(500).json({
            message:"Internal server error !"
        })
    }
}
const GetAllQuestion=async(req,res)=>{
try{
    const userId = req.user.exist._id; 
        console.log(userId);
        
        const enterprise = await Entreprise.findById(userId);
        if (!enterprise || enterprise.role!=="entreprise") {
            return res.status(404).json({ message: 'Enterprise not found' });
        }
        const {idOffer}=req.body
        const AllQuestion=await Question.find({offer:idOffer}).populate({path:'offer'})
        res.status(200).json({
            success:true,
            resault:AllQuestion
        })
}catch(err){
    res.status(500).json({
        message:"Internal server error !"
    }) 
}
}
module.exports={AddQuestion,DeleteQuestion,GetAllQuestion}