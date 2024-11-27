const express=require('express');
const Router=express.Router();
const OfferController=require("../Controllers/Offer.Controller")
const VerifyToken=require('../Middleware/VerifToken')
Router.post("/CreateOffer",VerifyToken,OfferController.CreateOffer);
Router.get("/GetAllOfferEmp",VerifyToken,OfferController.GetAllOfferEmp)
Router.get("/GetAllOfferEnt",VerifyToken,OfferController.GetAllOfferEnt)
Router.get("/GetOfferById",VerifyToken,OfferController.GetOfferById)
Router.delete("/DeleteOffer",VerifyToken,OfferController.DeleteOffer)
module.exports=Router;