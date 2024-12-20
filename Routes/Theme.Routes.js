const express=require('express')
const Router=express.Router();
const VerifyToken=require('../Middleware/VerifToken');
const ThemeController=require("../Controllers/Theme.Controller")
Router.post("/CreateTheme",VerifyToken,ThemeController.AddTheme)
Router.delete("/DeleteTheme",VerifyToken,ThemeController.DeleteTheme)
Router.get("/GetThemes",VerifyToken,ThemeController.GetThemes)

/**
 * @swagger
 * components:
 *   schemas:
 *     Theme:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the theme
 *         motCle:
 *           type: string
 *           description: The keyword associated with the theme
 *         offer:
 *           type: string
 *           description: The ID of the job offer related to the theme
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date when the theme was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date when the theme was last updated
 */
module.exports=Router
