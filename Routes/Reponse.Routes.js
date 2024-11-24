const express=require('express')
const Router=express.Router();
const VerifyToken=require('../Middleware/VerifToken');
const ReponseController=require("../Controllers/Reponse.Controller")
Router.post('/AddReponse',VerifyToken,ReponseController.createReponse);
Router.get('/GetReponse',VerifyToken,ReponseController.getAllReponses);
Router.get('/GetReponseById',VerifyToken,ReponseController.getReponseById);
Router.delete('/DeleteReaponse',VerifyToken,ReponseController.deleteReponse);
module.exports = Router;