const express=require('express')
const Router=express.Router();
const QuestionController=require("../Controllers/Question.Controller")
const VerifyToken=require('../Middleware/VerifToken')
Router.post("/CreateQuestion",VerifyToken,QuestionController.AddQuestion)
Router.delete("/DeleteQuestion",VerifyToken,QuestionController.DeleteQuestion)
Router.get("/GetQuizzByOffer/:idOffer",VerifyToken,QuestionController.GetQuizzByOffer)
/**
 * @swagger
 * /CreateQuestion:
 *   post:
 *     summary: Add multiple questions with responses to an offer
 *     tags: [Question]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     titre:
 *                       type: string
 *                       description: The question title
 *                     offer:
 *                       type: string
 *                       description: The ID of the offer associated with the question
 *                     reponses:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           reponseText:
 *                             type: string
 *                             description: The text of the response option
 *                           isCorrect:
 *                             type: boolean
 *                             description: Indicates whether the response is correct
 *     responses:
 *       201:
 *         description: Questions and responses added successfully
 *       400:
 *         description: Bad request (missing fields or invalid data)
 *       404:
 *         description: Enterprise not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /DeleteQuestion:
 *   delete:
 *     summary: Delete a question
 *     tags: [Question]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               questionId:
 *                 type: string
 *                 description: The ID of the question to be deleted
 *     responses:
 *       200:
 *         description: Question deleted successfully
 *       404:
 *         description: Question not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /GetQuizzByOffer/{idOffer}:
 *   get:
 *     summary: Get all questions for a specific offer
 *     tags: [Question]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idOffer
 *         required: true
 *         description: The ID of the offer to get questions for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of questions for the offer
 *       404:
 *         description: Employe not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the question
 *         titre:
 *           type: string
 *           description: The title or question text
 *         offer:
 *           type: string
 *           description: The ID of the associated offer
 *         reponses:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               reponseText:
 *                 type: string
 *                 description: The text of a possible response to the question
 *               isCorrect:
 *                 type: boolean
 *                 description: Whether this response is the correct answer
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the question was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the question was last updated
 */
module.exports=Router