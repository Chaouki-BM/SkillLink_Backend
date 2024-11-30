const Question=require("../Models/Question.model")
const Entreprise=require('../Models/Entreprise.model')

//Example mt3 kifh lazem tkoun Request
// {
//     "titre": "What is the capital of France?",
//     "offer": "6324abc1234567",
//     "reponses": [
//         { "reponseText": "Paris", "isCorrect": true },
//         { "reponseText": "London", "isCorrect": false },
//         { "reponseText": "Berlin", "isCorrect": false }
//     ]
// }

const AddQuestion=async(req,res)=>{
try{
    const userId = req.user.exist; 
    const enterprise = await Entreprise.findById(userId);
    if (!enterprise || enterprise.role!=="entreprise") {
        return res.status(404).json({ message: 'Enterprise not found' });
    }
    console.log("----------->",userId);
    
    
        const { titre, offer, reponses } = req.body;

        const newQuestion = new Question({
            titre,
            offer,
            reponses 
        });

        await newQuestion.save();
            return res.status(201).json({
                success: true,
                message: "Question with responses created successfully",
            });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal server error!"
        });
    }
}

const DeleteQuestion=async(req,res)=>{
    try{
        const userId = req.user.exist; 
        console.log(userId);
        
        const enterprise = await Entreprise.findById(userId);
        if (!enterprise || enterprise.role!=="entreprise") {
            return res.status(404).json({ message: 'Enterprise not found' });
        }
        const {questionId}=req.body;
        const DeleteQuestion=await Question.findByIdAndDelete(questionId)
        if(!DeleteQuestion){
          return res.status(200).json({
        success:false,
        message:"Question not found !"
        })
    }
        res.status(200).json({
            success:true,
            message:"Question deleted successfully"
        })
       
        
    }catch(err){
        res.status(500).json({
            message:"Internal server error !"
        })
    }
}
const GetAllQuestion=async(req,res)=>{
try{
    const userId = req.user.exist; 
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