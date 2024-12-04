const Resultat=require('../Models/Resultat.model')
const Theme = require('../Models/theme.model')
const Entreprise=require('../Models/Entreprise.model')
const Employe=require('../Models/Employe.model')
const Offer=require('../Models/Offer.model')
const fs = require('fs');
const pdfParse = require('pdf-parse');
const path = require('path');
const CV = require('../Models/Cv.model')
const nlp = require('compromise');



const extractTextFromPDF = async (filePath) => {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    return pdfData.text;
};

const postuler=async(req,res)=>{
    try {
    const {EmployeId,idCv,OfferId}=req.body;
    const pdf = await CV.findById({Employe:EmployeId,_id:idCv});
    let filePath=path.resolve(pdf.pdf)
    const text = await extractTextFromPDF(filePath);
    const lowerCaseText = text.toLowerCase();
    
    
    const doc = nlp(lowerCaseText);

    const keywords= await Theme.find({offer:OfferId});
    const isCompatible = keywords.every((word) => doc.has(word.motCle.toLowerCase()));
      if (!isCompatible) {
        return res.status(404).json({
           success:false,
            message:"The CV is not compatible with the job offer."  
        })
      } 
    console.log(`The CV is compatible with the job offer!`);
    return res.status(200).json({
      success:true,
       message:"The CV is compatible with the job offer!"  
   })
    
} catch (error) {
    console.error("Error:", error.message);
}
}
const PostScorecondidature=async(req,res)=>{
try{
  const{offer,Employe,score}=req.body
  if(score>=70){
    const newResultat = new Resultat({
      offer,
      Employe,
      score
  });

  await newResultat.save();
  return res.status(201).json({
    success: true,
    message: "Application accepted successfully.",
});
  }else{
    return res.status(201).json({
      success: true,
      message: "Application rejected.",
  });
  }
}catch(err){
  console.error("Error:", err.message);
  res.status(500).json({
    message:"Internal server error !"
}) 
}
} 
//hathi lel espace employer 
const GetListeCondidature=async(req,res)=>{
  try{
    const userId = req.user.exist; 
    const employe = await Employe.findById(userId);
    console.log(employe);
    if (!employe || employe.role!=="employe") {
        return res.status(404).json({ message: 'Employe not found' });
    }
    const resultat= await Resultat.find({Employe:userId}).populate({
      path: 'offer',
      select: 'titre Enterprise',
       populate: {
         path: 'Enterprise',
         select: 'nom avatar'
     }
    }).lean()
    if (!resultat) {
      return res.status(404).json({ message: 'Result not found' });
  }
  res.status(200).json({
      success: true,
         resultat: resultat
      
  });
  }catch(err){
    console.error("Error:", err.message);
    res.status(500).json({
      message:"Internal server error !"
  })  
  }
}
const GetListeCondidatureE=async(req,res)=>{
  try{
    const userId = req.user.exist;
    const enterprise = await Entreprise.findById(userId);

    if (!enterprise || enterprise.role !== "entreprise") {
        return res.status(404).json({ message: 'Enterprise not found' });
    }
    const offers = await Offer.find({ Enterprise: userId }).select('titre')
    .populate({
      path: 'resultats',
      populate: {
          path: 'Employe',
          select: 'nom prenom avatar', 
          populate: {
              path: 'Cv',
              select: 'pdf' 
          }
      }
  }).lean();
    res.status(200).json({
      success: true,
      data: offers
  });
  }catch(err){
    console.error("Error:", err.message);
    res.status(500).json({
      message:"Internal server error !"
  })  
  }
}

module.exports={postuler,PostScorecondidature,GetListeCondidature,GetListeCondidatureE}