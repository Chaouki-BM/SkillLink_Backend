const express=require('express')
const Router=express.Router();
const VerifyToken=require('../Middleware/VerifToken');
const ResualtatController=require("../Controllers/Resultat.Controller")
Router.post('/Post',ResualtatController.postuler);
Router.post('/PostScorecondidature',ResualtatController.PostScorecondidature);
Router.get('/GetListeCondidature',VerifyToken,ResualtatController.GetListeCondidature);

module.exports = Router;