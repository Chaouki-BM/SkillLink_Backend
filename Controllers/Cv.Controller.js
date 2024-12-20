const path = require('path');
const CV = require('../Models/Cv.model')
const Employe=require('../Models/Employe.model')
const fs = require('fs')
const UploadCv =async (req, res) => {
    try {
    const userId = req.user.exist; 
    
    
    const employe = await Employe.findById(userId);
    console.log(employe);
    if (!employe || employe.role!=="employe") {
        return res.status(404).json({ message: 'Employe not found' });
    }
        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
            
            
        }
        // Create a new PDF document with the file path
        const NewCV = new CV({ pdf: req.file.path,Employe:userId });
        const savedPdf = await NewCV.save();

        res.status(201).json({
            message: 'PDF uploaded and file path saved to database',
            pdf: savedPdf
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const DeleteCv=async (req,res)=>{
try{
    const userId = req.user.exist; 
    const employe = await Employe.findById(userId);
    console.log(employe);
    if (!employe || employe.role!=="employe") {
        return res.status(404).json({ message: 'Employe not found' });
    }
    const {idCV}=req.body;
    const pdf = await CV.findById({Employe:userId,_id:idCV});
    
    if (!pdf) {
        return res.status(404).json({ message: 'Cv not found' });  
    }
    fs.unlink(path.resolve(pdf.pdf), (err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to delete file', error: err });
        }
        
        // Delete the PDF document from the database
        CV.findByIdAndDelete({Employe:userId,_id:idCV})
            .then(() => res.status(200).json({ message: 'Cv deleted successfully' }))
            .catch((error) => res.status(500).json({ message: 'Failed to delete Cv from database', error }));
    });
}catch(error){
    res.status(500).json({ message: error.message });
}
}
module.exports={UploadCv,DeleteCv}