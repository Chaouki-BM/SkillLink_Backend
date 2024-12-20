const express=require('express');
const Router=express.Router();
const EntrepriseController=require("../Controllers/Entreprise.Controller")
const VerifyToken=require('../Middleware/VerifToken')
const upload = require('../Middleware/Multer');
Router.post("/entreprise",EntrepriseController.Login_Ent);
Router.post("/Rentreprise",EntrepriseController.SignIN_Ent);
Router.get("/verificationEnt",EntrepriseController.Verif_Mail);
Router.get("/UpdatePasswordEnt/:email",EntrepriseController.update_Password);
Router.post("/UpAvatarEnt",VerifyToken, upload.single('Avatar') ,EntrepriseController.UpAvatar);
Router.post("/UpdateProfileEnt",VerifyToken,EntrepriseController.UpdateProfile);
Router.post("/forgetPasswordEnt",EntrepriseController.Forget_Password);
/**
 * @swagger
 * /entreprise:
 *   post:
 *     summary: Login an enterprise user
 *     description: Authenticates the enterprise user by verifying email and password, and returns a JWT token for authenticated access.
 *     tags:
 *       - Enterprise
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "enterprise@example.com"
 *               password:
 *                 type: string
 *                 example: "securePassword123"
 *     responses:
 *       200:
 *         description: Login successful and JWT token generated
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
 *                   example: "welcome back"
 *                 result:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleGFzdCI6ICJfZm9vYmFyIn0.lR5Mz4gdF1v1fg55fg"
 *                     nom:
 *                       type: string
 *                       example: "Enterprise XYZ"
 *                     avatar:
 *                       type: string
 *                       example: "/uploads/enterprise-avatar.png"
 *       400:
 *         description: Incorrect email or password
 *       401:
 *         description: Email not verified
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /Rentreprise:
 *   post:
 *     summary: Register a new enterprise user
 *     description: Registers a new enterprise user with their information and sends a verification email.
 *     tags:
 *       - Enterprise
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "newenterprise@example.com"
 *               password:
 *                 type: string
 *                 example: "newPassword123"
 *               nom:
 *                 type: string
 *                 example: "New Enterprise"
 *               description:
 *                 type: string
 *                 example: "A new innovative company"
 *               address:
 *                 type: string
 *                 example: "123 New Street, City"
 *               siteW:
 *                 type: string
 *                 example: "www.newenterprise.com"
 *               CodePostal:
 *                 type: string
 *                 example: "12345"
 *     responses:
 *       201:
 *         description: Enterprise registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 result:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60b5f6e4baf1d9b12cd65421"
 *                     email:
 *                       type: string
 *                       example: "newenterprise@example.com"
 *       400:
 *         description: Enterprise already exists
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /forgetPasswordEnt:
 *   post:
 *     summary: Request a password reset link
 *     description: Sends a password reset link to the enterprise user's email if the email is valid.
 *     tags:
 *       - Enterprise
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "enterprise@example.com"
 *     responses:
 *       200:
 *         description: Password reset link sent successfully
 *       400:
 *         description: Email not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /verificationEnt:
 *   get:
 *     summary: Verify enterprise email
 *     description: Verifies the email of an enterprise user by updating their status after the verification link is clicked.
 *     tags:
 *       - Enterprise
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           example: "enterprise@example.com"
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid email
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /UpdatePasswordEnt/{email}:
 *   put:
 *     summary: Update enterprise user password
 *     description: Updates the password of the enterprise user based on their ID.
 *     tags:
 *       - Enterprise
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *           example: "60b5f6e4baf1d9b12cd65421"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: "newSecurePassword123"
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Invalid enterprise ID
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /UpAvatarEnt:
 *   post:
 *     summary: Uploads an avatar for the enterprise
 *     description: Allows the authenticated enterprise to upload their avatar image and save the file path in the database.
 *     tags:
 *       - Enterprise
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               Avatar:
 *                 type: string
 *                 format: binary
 *                 description: The avatar image to be uploaded
 *     responses:
 *       201:
 *         description: Avatar uploaded successfully and file path saved in the database
 *       400:
 *         description: No avatar uploaded
 *       404:
 *         description: Enterprise not found or incorrect role
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /UpdateProfileEnt:
 *   put:
 *     summary: Update enterprise profile
 *     description: Updates the profile information for the authenticated enterprise user.
 *     tags:
 *       - Enterprise
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 example: "New Enterprise Name"
 *               description:
 *                 type: string
 *                 example: "Updated company description"
 *               address:
 *                 type: string
 *                 example: "123 New Address"
 *               siteW:
 *                 type: string
 *                 example: "www.newenterprise.com"
 *               CodePostal:
 *                 type: string
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: Profile updated successfully
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
 *                   example: "Votre profil a été mis à jour avec succès"
 *                 data:
 *                   type: object
 *                   properties:
 *                     nom:
 *                       type: string
 *                       example: "New Enterprise Name"
 *                     description:
 *                       type: string
 *                       example: "Updated company description"
 *                     address:
 *                       type: string
 *                       example: "123 New Address"
 *                     siteW:
 *                       type: string
 *                       example: "www.newenterprise.com"
 *                     CodePostal:
 *                       type: string
 *                       example: "12345"
 *       400:
 *         description: Enterprise not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Enterprise:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the enterprise
 *         email:
 *           type: string
 *           description: The email of the enterprise
 *         password:
 *           type: string
 *           description: The password for the enterprise account (hashed)
 *         role:
 *           type: string
 *           description: The role of the user, default is 'entreprise'
 *           example: entreprise
 *         etat:
 *           type: boolean
 *           description: The status of the enterprise (active or inactive)
 *           example: true
 *         avatar:
 *           type: string
 *           description: The avatar image URL of the enterprise
 *           example: "https://example.com/avatar.png"
 *         nom:
 *           type: string
 *           description: The name of the enterprise
 *           example: "Example Enterprise"
 *         description:
 *           type: string
 *           description: A description of the enterprise
 *           example: "A leading company in tech innovations."
 *         address:
 *           type: string
 *           description: The physical address of the enterprise
 *           example: "1234 Innovation Blvd, Tech City"
 *         siteW:
 *           type: string
 *           description: The website URL of the enterprise
 *           example: "https://www.example.com"
 *         CodePostal:
 *           type: string
 *           description: The postal code of the enterprise's location
 *           example: "5021"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the enterprise was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the enterprise was last updated
 */

module.exports=Router;