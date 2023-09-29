const dotenv = require('dotenv');
dotenv.config();

//importing validation function:
const { isValidPhoneNumber } = require('../util/validation')

const twilio = require('twilio');

const client = new twilio.Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


exports.sendMessage=async (req,res,next)=>{
    const { to,message } = req.body;
    try {
    if (!isValidPhoneNumber(to)) {
        // console.log('phone: ',to)

        return res.status(400).json({ error: 'Invalid phone number' });
    }
        // Send an SMS
        await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to,
        });

        // Respond with success
        res.status(200).json({ message: 'SMS sent successfully' });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'An error occurred on the server' });
    }

}