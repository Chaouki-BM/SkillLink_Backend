const express=require('express');
const Router=express.Router();
const EmployeController=require("../Controllers/Employe.Controller")
const VerifyToken=require('../Middleware/VerifToken')
Router.post("/employe",EmployeController.Login_EMP);
Router.post("/Remploye",EmployeController.SignIN_Emp);
Router.post("/forgetPassword",EmployeController.Forget_Password);
Router.get("/verification",EmployeController.Verif_Mail);
Router.get("/UpdatePassword/:email",EmployeController.update_Password);
module.exports=Router;