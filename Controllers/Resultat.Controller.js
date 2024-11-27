const Resultat=require('../Models/Resultat.model')
const Theme = require('../Models/theme.model')
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

module.exports={postuler}