const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      tls: {
        rejectUnauthorized: true,
        minVersion: "TLSv1.2"
    },
      secure: false,
      auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.PASSWORD, // Your email password or app-specific password
      },
    });
    module.exports = transporter;