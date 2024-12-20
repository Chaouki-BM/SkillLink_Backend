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
/**
 * @swagger
 * /CreateOffer:
 *   post:
 *     summary: Create a new job offer
 *     description: Allows an enterprise to create a new job offer.
 *     tags:
 *       - Offer
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Job description
 *               titre:
 *                 type: string
 *                 description: Job title
 *               experience:
 *                 type: string
 *                 description: Required years of experience
 *               Contract:
 *                 type: string
 *                 description: Employment contract type (e.g., Full-time, Part-time)
 *               lieu:
 *                 type: string
 *                 description: Job location
 *               exigence:
 *                 type: string
 *                 description: Job requirements
 *               mession:
 *                 type: string
 *                 description: Job responsibilities
 *               motCle:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of keywords associated with the offer
 *     responses:
 *       201:
 *         description: Offer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 offer:
 *                   $ref: '#/components/schemas/Offer'
 *       404:
 *         description: Enterprise not found or unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /DeleteOffer:
 *   post:
 *     summary: Delete a job offer
 *     description: Allows an enterprise to delete a job offer by its ID.
 *     tags:
 *       - Offer
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Job offer ID to be deleted
 *     responses:
 *       200:
 *         description: Offer deleted successfully
 *       400:
 *         description: Offer ID is required
 *       404:
 *         description: Offer not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /GetAllOfferEmp:
 *   get:
 *     summary: Get all job offers for employees
 *     description: Retrieves all job offers for employees, including associated themes.
 *     tags:
 *       - Offer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of offers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 result:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Offer'
 *       404:
 *         description: Employee not found or unauthorized
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /GetAllOfferEnt:
 *   get:
 *     summary: Get all job offers for entreprise
 *     description: Retrieves all job offers for entreprise, including associated themes.
 *     tags:
 *       - Offer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of offers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 result:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Offer'
 *       404:
 *         description: Employee not found or unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /GetOfferById/{offerId}:
 *   get:
 *     summary: Get a job offer by ID
 *     description: Retrieves a specific job offer and its associated enterprise information by the offer ID.
 *     tags:
 *       - Offer
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: offerId
 *         in: path
 *         required: true
 *         description: ID of the job offer to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job offer details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 result:
 *                   $ref: '#/components/schemas/Offer'
 *       404:
 *         description: Offer not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /ChangeStatus:
 *   patch:
 *     summary: Change the status of an offer
 *     description: Updates the status of an offer based on the provided request body.
 *     tags:
 *       - Offer
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               OfferId:
 *                 type: string
 *                 description: The ID of the offer to update.           
 *     responses:
 *       200:
 *         description: Successfully updated the offer status.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Offer status updated successfully."
 *       400:
 *         description: Bad request. Missing or invalid parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid offer ID or status."
 *       401:
 *         description: Unauthorized. Token verification failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Unauthorized access."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "An error occurred while updating the offer status."
 */
/**
 * @swagger
 * /UpdateOfferById/{offerId}:
 *   put:
 *     summary: Update a job offer by ID
 *     description: Allows an enterprise to update an existing job offer and its associated themes.
 *     tags:
 *       - Offer
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: offerId
 *         in: path
 *         required: true
 *         description: ID of the job offer to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               titre:
 *                 type: string
 *               experience:
 *                 type: string
 *               Contract:
 *                 type: string
 *               lieu:
 *                 type: string
 *               exigence:
 *                 type: string
 *               mession:
 *                 type: string
 *               motCle:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Offer updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Offer'
 *       404:
 *         description: Offer not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Offer:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         description:
 *           type: string
 *         titre:
 *           type: string
 *         experience:
 *           type: string
 *         Contract:
 *           type: string
 *         lieu:
 *           type: string
 *         exigence:
 *           type: string
 *         mession:
 *           type: string
 *         motCle:
 *           type: array
 *           items:
 *             type: string
 *         Enterprise:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             nom:
 *               type: string
 *             avatar:
 *               type: string
 *             description:
 *               type: string
 *             siteW:
 *               type: string
 *             CodePostal:
 *               type: string
 */

module.exports=Router;