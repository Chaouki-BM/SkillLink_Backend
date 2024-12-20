const express=require('express');
const Router=express.Router();
const EmployeController=require("../Controllers/Employe.Controller")
const VerifyToken=require('../Middleware/VerifToken')
const upload = require('../Middleware/Multer');
Router.post("/employe",EmployeController.Login_EMP);
Router.post("/Remploye",EmployeController.SignIN_Emp);
Router.post("/forgetPassword",EmployeController.Forget_Password);
Router.get("/verification",EmployeController.Verif_Mail);
Router.get("/UpdatePassword/:email",EmployeController.update_Password);
Router.post('/UpAvatar',VerifyToken, upload.single('Avatar'), EmployeController.UpAvatar);
Router.get("/GetDataEm",VerifyToken,EmployeController.getData);
Router.post('/UpdateProfile',VerifyToken,EmployeController.UpdateProfile);

/**
 * @swagger
 * /employe:
 *   post:
 *     summary: Log in an employee
 *     tags: [Employe]
 *     description: Authenticates an employee using their email and password. Returns a JWT token if the credentials are valid.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Employee's email address.
 *                 example: employee@example.com
 *               password:
 *                 type: string
 *                 description: Employee's password.
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successful login.
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
 *                   example: Welcome back
 *                 result:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: JWT token for authentication.
 *                     id:
 *                       type: string
 *                       description: Employee ID.
 *                     etat:
 *                       type: boolean
 *                       description: Account verification status.
 *                     avatar:
 *                       type: string
 *                       description: URL of the employee's avatar.
 *                     nom:
 *                       type: string
 *                       description: Employee's first name.
 *                     prenom:
 *                       type: string
 *                       description: Employee's last name.
 *                     role:
 *                       type: string
 *                       description: Employee's role.
 *                     Cv:
 *                       type: array
 *                       items:
 *                         type: object
 *                         description: CVs linked to the employee.
 *       400:
 *         description: Invalid credentials.
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
 *                   example: Password incorrect
 *       401:
 *         description: Email verification required.
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
 *                   example: You need to verify your email first!
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
/**
 * @swagger
 * /Remploye:
 *   post:
 *     summary: Register a new employee
 *     tags: [Employe]
 *     description: Registers a new employee by creating an account with email, password, and other required details. Sends a verification email upon successful registration.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Employee's email address.
 *                 example: employee@example.com
 *               password:
 *                 type: string
 *                 description: Password for the new account.
 *                 example: strongpassword123
 *               nom:
 *                 type: string
 *                 description: Employee's first name.
 *                 example: John
 *               prenom:
 *                 type: string
 *                 description: Employee's last name.
 *                 example: Doe
 *               posteT:
 *                 type: string
 *                 description: Employee's job position.
 *                 example: Software Engineer
 *               NumT:
 *                 type: string
 *                 description: Employee's phone number.
 *                 example: "+1234567890"
 *     responses:
 *       201:
 *         description: Successfully registered.
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
 *                       description: Employee's unique ID.
 *                     email:
 *                       type: string
 *                       description: Employee's email address.
 *                     avatar:
 *                       type: string
 *                       description: Avatar URL (default is "null").
 *                     nom:
 *                       type: string
 *                       description: First name of the employee.
 *                     prenom:
 *                       type: string
 *                       description: Last name of the employee.
 *                     posteT:
 *                       type: string
 *                       description: Job position.
 *                     NumT:
 *                       type: string
 *                       description: Phone number.
 *       400:
 *         description: Employee already exists.
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
 *                   example: employe already exists!
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
/**
 * @swagger
 * /verification:
 *   get:
 *     summary: Verify employee email
 *     tags: [Employe]
 *     description: Verifies an employee's email address using a query parameter. Redirects to the login page upon successful verification.
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee's email address to be verified.
 *         example: employee@example.com
 *     responses:
 *       200:
 *         description: Email verified and redirect to login page.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: Redirected to login page.
 *       400:
 *         description: Verification failed due to invalid or missing email.
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
 *                   example: Email incorrect
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
/**
 * @swagger
 * /UpdatePassword/{email}:
 *   get:
 *     summary: Update an employee's password
 *     tags: [Employe]
 *     description: Updates the password of an employee based on their email address.
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: The email of the employee whose password is to be updated.
 *         example: employee@example.com
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: The new password for the employee.
 *                 example: NewStrongPassword123
 *     responses:
 *       201:
 *         description: Password successfully updated.
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
 *                   example: Password Updated.
 *                 result:
 *                   type: object
 *                   description: Updated employee details.
 *       400:
 *         description: Employee not found or email incorrect.
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
 *                   example: Email incorrect
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
/**
 * @swagger
 * /forgetPassword:
 *   post:
 *     summary: Request a password reset link
 *     description: Sends a password reset link to the employe user's email if the email is valid.
 *     tags: [Employe]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "employe@example.com"
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
 * /GetDataEm:
 *   get:
 *     summary: Retrieves the authenticated employee's profile data
 *     description: Fetches the authenticated employee's profile details, including their name, position, contact number, avatar, and CVs.
 *     tags: [Employe]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Employee data successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 nom:
 *                   type: string
 *                   example: "John"
 *                 prenom:
 *                   type: string
 *                   example: "Doe"
 *                 posteT:
 *                   type: string
 *                   example: "Developer"
 *                 NumT:
 *                   type: string
 *                   example: "1234567890"
 *                 avatar:
 *                   type: string
 *                   example: "/uploads/avatar123.png"
 *                 CV:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "63a0d15c9b8e9d4567d8f9a3"
 *                       title:
 *                         type: string
 *                         example: "CV Example"
 *       404:
 *         description: Employee not found or incorrect role
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /UpAvatar:
 *   post:
 *     summary: Uploads an avatar for the authenticated employee
 *     description: Allows an authenticated employee to upload their avatar image and save the file path in the database.
 *     tags: [Employe]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              Avatar:
 *                type: string
 *                format: binary
 *                description: The avatar image to be uploaded
 *     responses:
 *       200:
 *         description: Avatar uploaded successfully and file path saved in the database
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Avatar uploaded and file path saved to database
 *       400:
 *         description: No avatar file uploaded
 *       404:
 *         description: Employee not found or incorrect role
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /UpdateProfile:
 *   put:
 *     summary: Updates the employee's profile information
 *     description: Allows the authenticated employee to update their profile details, including name, position, and contact number.
 *     tags: [Employe]
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
 *                 example: "John"
 *               prenom:
 *                 type: string
 *                 example: "Doe"
 *               posteT:
 *                 type: string
 *                 example: "Developer"
 *               NumT:
 *                 type: string
 *                 example: "1234567890"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Votre profil a été mis à jour avec succès"
 *                 data:
 *                   type: object
 *                   properties:
 *                     nom:
 *                       type: string
 *                       example: "John"
 *                     prenom:
 *                       type: string
 *                       example: "Doe"
 *                     posteT:
 *                       type: string
 *                       example: "Developer"
 *                     NumT:
 *                       type: string
 *                       example: "1234567890"
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Employe:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the employee
 *         email:
 *           type: string
 *           description: The email address of the employee
 *           example: "employee@example.com"
 *         password:
 *           type: string
 *           description: The password for the employee account
 *           example: "password123"
 *         etat:
 *           type: boolean
 *           description: The current status of the employee (active or inactive)
 *           example: false
 *         avatar:
 *           type: string
 *           description: The avatar or profile picture of the employee
 *           example: "https://example.com/avatar.png"
 *         nom:
 *           type: string
 *           description: The first name of the employee
 *           example: "John"
 *         prenom:
 *           type: string
 *           description: The last name of the employee
 *           example: "Doe"
 *         role:
 *           type: string
 *           description: The role of the employee (e.g., "employe")
 *           example: "employe"
 *         posteT:
 *           type: string
 *           description: The job title of the employee
 *           example: "Software Developer"
 *         NumT:
 *           type: string
 *           description: The phone number of the employee
 *           example: "+1234567890"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the employee record was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the employee record was last updated
 */
module.exports=Router;