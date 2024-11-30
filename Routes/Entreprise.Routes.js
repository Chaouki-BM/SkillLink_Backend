const express=require('express');
const Router=express.Router();
const EntrepriseController=require("../Controllers/Entreprise.Controller")
const VerifyToken=require('../Middleware/VerifToken')
Router.post("/entreprise",EntrepriseController.Login_Ent);
Router.post("/Rentreprise",EntrepriseController.SignIN_Ent);
Router.post("/forgetPasswordEnt",EntrepriseController.Forget_Password);
Router.get("/verificationEnt",EntrepriseController.Verif_Mail);
Router.get("/UpdatePasswordEnt/:email",EntrepriseController.update_Password);
Router.post("/UpAvatarEnt",VerifyToken,EntrepriseController.UpAvatar);
Router.post("/UpdateProfile",VerifyToken,EntrepriseController.UpdateProfile);
module.exports=Router;