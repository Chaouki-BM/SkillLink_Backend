const transporter = require('./ConfigNodeMailer');



const sendRejectionEmail = async (req,res) => {
    try {
        const { jobTitle, candidateName,candidateEmail,CompanyName} = req.body;

        
        if (!jobTitle || !candidateName || !candidateEmail || !CompanyName ) {
            return res.status(400).json({ message: 'Missing required email fields' });
        }

        const mailOptions = {
            from: `SkillLink <${process.env.EMAIL}>`, 
            to: candidateEmail, // Candidate's email
            subject: `Application Update for ${jobTitle}`, // Subject line
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #444;">Dear ${candidateName},</h2>
                    <p>
                        Thank you for applying for the <strong>${jobTitle}</strong> position at <strong>${CompanyName}</strong>. 
                        After careful review of your application and test results, we regret to inform you that we have decided to proceed with other candidates for this role.
                    </p>
                    <p>
                        Please know that this decision was not easy, as we received many qualified applications. 
                        While this opportunity did not work out, we encourage you to keep an eye on our careers page for future openings that might match your profile.
                    </p>
                    <p>
                        We appreciate your interest in joining <strong>${CompanyName}</strong> and wish you the best in your job search and future career.
                    </p>
                    <p style="margin-top: 20px;">
                        Sincerely, <br>
                        The Recruitment Team at ${CompanyName}
                    </p>
                </div>
            `
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log(`Rejection email sent to ${candidateEmail}`);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
module.exports = sendRejectionEmail;
   