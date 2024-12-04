const Question=require("../Models/Question.model")
const Entreprise=require('../Models/Entreprise.model')
const Employe=require('../Models/Employe.model')
//Example mt3 kifh lazem tkoun Request lazem t7othom fi array of questions kima lota 
// 7athr data ta3k w ab3thha lel bodi fi array
// {
//     "questions": [
//         {
//             "titre": "1+1 =?",
//             "offer": "67471edb8224a69ddd038887",
//             "reponses": [
//                 { "reponseText": "4", "isCorrect": false },
//                 { "reponseText": "2", "isCorrect": true },
//                 { "reponseText": "1", "isCorrect": false }
//             ]
//         },
//         {
//             "titre": "2 + 2 9addah?",
//             "offer": "67471edb8224a69ddd038887",
//             "reponses": [
//                 { "reponseText": "4", "isCorrect": true },
//                 { "reponseText": "3", "isCorrect": false },
//                 { "reponseText": "5", "isCorrect": false }
//             ]
//         }
//     ]
// }

const AddQuestion=async(req,res)=>{
    try {
        const userId = req.user.exist;
        const enterprise = await Entreprise.findById(userId);

        if (!enterprise || enterprise.role !== "entreprise") {
            return res.status(404).json({ message: 'Enterprise not found' });
        }

        const { questions } = req.body; // Expecting an array of questions

        const createdQuestions = [];

        for (const questionData of questions) {
            const { titre, offer, reponses } = questionData;

            const newQuestion = new Question({
                titre,
                offer,
                reponses
            });

            await newQuestion.save();
            createdQuestions.push(newQuestion);
        }

        return res.status(201).json({
            success: true,
            message: "Questions with responses created successfully",
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
const GetQuizzByOffer=async(req,res)=>{
try{
    const userId = req.user.exist; 
        const employe = await Employe.findById(userId);
        if (!employe || employe.role!=="employe") {
            return res.status(404).json({ message: 'Employe not found' });
        }
        
        const {idOffer}=req.params;
        const AllQuestion=await Question.find({offer:idOffer})
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

module.exports={AddQuestion,DeleteQuestion,GetQuizzByOffer}