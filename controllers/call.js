const dotenv = require('dotenv');
dotenv.config();

//importing validation function:
const { isValidPhoneNumber } = require('../util/validation')
const twilio = require('twilio');

const client = new twilio.Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


exports.makeCall = async (req, res, next) => {
    const { to } = req.body;
    

    try {
        if (!isValidPhoneNumber(to)) {
            console.log('phone: ',to)
    
            return res.status(400).json({ error: 'Invalid phone number' });
        }
        // Make a call
        const call = await client.calls.create({
            url: 'http://demo.twilio.com/docs/voice.xml', // TwiML for the call/other host
            to,
            from: process.env.TWILIO_PHONE_NUMBER,
        });

        // Respond with success
        res.status(200).json({ message: 'Call initiated successfully', callSid: call.sid });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'An error occurred on the server' });
    }

}
