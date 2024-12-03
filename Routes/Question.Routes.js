const express=require('express')
const Router=express.Router();
const QuestionController=require("../Controllers/Question.Controller")
const VerifyToken=require('../Middleware/VerifToken')
Router.post("/CreateQuestion",VerifyToken,QuestionController.AddQuestion)
Router.delete("/DeleteQuestion",VerifyToken,QuestionController.DeleteQuestion)
Router.get("/GetQuizzByOffer",VerifyToken,QuestionController.GetQuizzByOffer)
module.exports=Router