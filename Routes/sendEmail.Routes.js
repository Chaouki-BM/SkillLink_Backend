const express=require('express');
const Router=express.Router();
const NodeMailer = require('../Middleware/NodeMailer');

// Define a route that uses the sendEmailMiddleware
Router.post('/send-email',NodeMailer);

module.exports=Router;