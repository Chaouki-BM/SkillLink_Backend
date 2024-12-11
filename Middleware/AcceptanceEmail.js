const transporter = require('./ConfigNodeMailer');

const sendAcceptanceEmail = async (req,res) => {
    try {
        const { jobTitle, candidateName,candidateEmail,CompanyName} = req.body;

        
        if (!jobTitle || !candidateName || !candidateEmail || !CompanyName ) {
            return res.status(400).json({ message: 'Missing required email fields' });
        }

        const mailOptions = {
            from: `SkillLink <${process.env.EMAIL}>`, 
            to: candidateEmail, 
            subject: `Congratulations! You're selected for the ${jobTitle} position`, 
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #444;">Dear ${candidateName},</h2>
                    <p>
                        We are thrilled to inform you that you have been selected for the <strong>${jobTitle}</strong> position at <strong>${CompanyName}</strong>! 
                        Your skills and qualifications align perfectly with our team's needs, and we are excited to have you on board.
                    </p>
                    <p>
                        Here are the next steps to finalize your onboarding:
                    </p>
                    <ul>
                        <li>Complete the attached onboarding form and return it by one week.</li>
                        <li>Prepare the necessary documents (e.g., identification, certifications).</li>
    
                    </ul>
                    <p>
                        Please confirm your acceptance of this offer by replying to this email .
                    </p>
                    <p>
                        Once again, congratulations on this achievement! We look forward to working with you and having you as a part of our team.
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
        console.log(`Acceptance email sent to ${candidateEmail}`);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
module.exports = sendAcceptanceEmail;