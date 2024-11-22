const express=require('express')
const Router=express.Router();
const VerifyToken=require('../Middleware/VerifToken');
const ThemeController=require("../Controllers/Theme.Controller")
Router.post("/CreateTheme",VerifyToken,ThemeController.AddTheme)
Router.delete("/DeleteTheme",VerifyToken,ThemeController.DeleteTheme)
Router.get("/GetThemes",VerifyToken,ThemeController.GetThemes)
module.exports=Router
