const express=require('express')
const Router=express.Router();
const VerifyToken=require('../Middleware/VerifToken');
const CvController=require("../Controllers/Cv.Controller")
const upload = require('../Middleware/Multer');
Router.post('/upload',VerifyToken, upload.single('pdf'), CvController.UploadCv);
Router.delete('/deleteCv',VerifyToken, CvController.DeleteCv);
module.exports = Router;