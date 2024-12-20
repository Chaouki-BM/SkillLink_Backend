const express=require('express')
const Router=express.Router();
const VerifyToken=require('../Middleware/VerifToken');
const CvController=require("../Controllers/Cv.Controller")
const upload = require('../Middleware/Multer');
Router.post('/upload',VerifyToken, upload.single('pdf'), CvController.UploadCv);
Router.delete('/deleteCv',VerifyToken, CvController.DeleteCv);
/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload a CV (PDF) for an employee
 *     description: Allows an employee to upload their CV (PDF format) and saves the file path in the database.
 *     tags: [CV]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               pdf:
 *                 type: string
 *                 format: binary
 *                 description: The PDF file of the CV
 *     responses:
 *       201:
 *         description: PDF uploaded successfully and file path saved to the database
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CV'
 *       400:
 *         description: No file uploaded
 *       404:
 *         description: Employee not found or unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /deleteCv:
 *   delete:
 *     summary: Delete a CV uploaded by an employee
 *     description: Allows an employee to delete their uploaded CV from the database and remove the file from the server.
 *     tags: [CV]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idCV:
 *                 type: string
 *                 description: The ID of the CV to delete
 *     responses:
 *       200:
 *         description: CV deleted successfully
 *       400:
 *         description: Bad request or missing data
 *       404:
 *         description: CV or employee not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     CV:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the CV
 *         pdf:
 *           type: string
 *           description: The file path to the uploaded CV in PDF format
 *         Employe:
 *           type: string
 *           description: The ID of the employee who uploaded the CV
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the CV was uploaded
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the CV was last updated
 */

module.exports = Router;