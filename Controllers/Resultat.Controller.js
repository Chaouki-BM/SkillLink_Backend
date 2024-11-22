const Resultat=require('../Models/Resultat.model')
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
    const {EmployeId,id}=req.body;
    const pdf = await CV.findById({Employe:EmployeId,_id:id});
    let filePath=path.resolve(pdf.pdf)
    const text = await extractTextFromPDF(filePath);
    console.log(text.toLowerCase());
    const lowerCaseText = text.toLowerCase();
    const doc = nlp(lowerCaseText);
    const keyword = "php";
    if (doc.has(keyword)) {
        console.log(`The text contains the word: ${keyword}`);
      } else {
        console.log(`The word "${keyword}" was not found in the text.`);
      }
} catch (error) {
    console.error("Error:", error.message);
}
}

module.exports={postuler}