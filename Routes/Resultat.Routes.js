const express=require('express')
const Router=express.Router();
const VerifyToken=require('../Middleware/VerifToken');
const ResualtatController=require("../Controllers/Resultat.Controller")
Router.post('/Post',VerifyToken,ResualtatController.postuler);
Router.post('/PostScorecondidature',ResualtatController.PostScorecondidature);
Router.get('/GetListeCondidature',VerifyToken,ResualtatController.GetListeCondidature);
Router.get('/GetListeCondidatureE',VerifyToken,ResualtatController.GetListeCondidatureE);
Router.post('/AccepterCondidature',VerifyToken,ResualtatController.accepter);
Router.post('/RefuseCondidature',VerifyToken,ResualtatController.refuse);
/**
 * @swagger
 * /Post:
 *   post:
 *     summary: Apply for a job by uploading a CV and checking compatibility with the job offer
 *     tags: [Resultat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idCv:
 *                 type: string
 *                 description: The ID of the CV being uploaded
 *               OfferId:
 *                 type: string
 *                 description: The ID of the job offer being applied to
 *     responses:
 *       200:
 *         description: The CV is compatible with the job offer
 *       404:
 *         description: The CV is not compatible with the job offer
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /PostScorecondidature:
 *   post:
 *     summary: Post the score for a job application and determine if it's accepted or rejected
 *     tags: [Resultat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               offer:
 *                 type: string
 *                 description: The ID of the job offer
 *               Employe:
 *                 type: string
 *                 description: The ID of the employee
 *               score:
 *                 type: number
 *                 description: The score of the application
 *     responses:
 *       201:
 *         description: The application has been processed successfully
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /GetListeCondidatureE:
 *   get:
 *     summary: Get the list of applications for the logged-in entreprise
 *     tags: [Resultat]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of applications for the entreprise
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 resultat:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Resultat'
 *       404:
 *         description: No applications found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /GetListeCondidature:
 *   get:
 *     summary: Get the list of applications for the logged-in employee
 *     tags: [Resultat]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of applications for the employee
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 resultat:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Resultat'
 *       404:
 *         description: No applications found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /AccepterCondidature:
 *   post:
 *     summary: Accept a job application for a specific result ID
 *     tags: [Resultat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ResultatrId:
 *                 type: string
 *                 description: The ID of the result to update with acceptance status
 *     responses:
 *       200:
 *         description: Application accepted successfully
 *       404:
 *         description: Result not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /RefuseCondidature:
 *   post:
 *     summary: Reject a job application for a specific result ID
 *     tags: [Resultat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ResultatrId:
 *                 type: string
 *                 description: The ID of the result to update with rejection status
 *     responses:
 *       200:
 *         description: Application rejected successfully
 *       404:
 *         description: Result not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Resultat:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the result
 *         offer:
 *           type: string
 *           description: The ID of the job offer associated with the result
 *         Employe:
 *           type: string
 *           description: The ID of the employee associated with the result
 *         score:
 *           type: number
 *           description: The score given to the employee's application
 *         etat:
 *           type: string
 *           enum: [en attend, Accepté, Refusé]
 *           description: The state of the application (default is "en attend")
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date when the result was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date when the result was last updated
 */
module.exports = Router;

