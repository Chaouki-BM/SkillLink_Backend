const express=require('express');
const Router=express.Router();
const OfferController=require("../Controllers/Offer.Controller")
const VerifyToken=require('../Middleware/VerifToken')
Router.post("/CreateOffer",VerifyToken,OfferController.CreateOffer);
Router.get("/GetAllOfferEmp",VerifyToken,OfferController.GetAllOfferEmp)
Router.get("/GetAllOfferEnt",VerifyToken,OfferController.GetAllOfferEnt)
Router.get("/GetOfferById/:offerId",VerifyToken,OfferController.GetOfferById)
Router.post("/DeleteOffer",VerifyToken,OfferController.DeleteOffer)
Router.patch("/ChangeStatus",VerifyToken,OfferController.ChangeStatus)
Router.put("/UpdateOfferById/:offerId",VerifyToken,OfferController.UpdateOfferById)
module.exports=Router;