const dotenv = require('dotenv');
dotenv.config();

//importing validation function:
const { isValidPhoneNumber } = require('../util/validation')
const twilio = require('twilio');

const client = new twilio.Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


exports.makeCall = async (req, res, next) => {
    const { to } = req.body;


    try {
        if (await isValidPhoneNumber(to)) {

            // Make a call
            const call = await client.calls.create({
                from: process.env.TWILIO_PHONE_NUMBER,
                to,
                url: process.env.TWILIOML // TwiML for the call/other host
            });

            // Respond with success
            res.status(200).json({ message: 'Call initiated successfully', callSid: call.sid });
        }
    } catch (error) {
        // Handle errors
        if (error.status == 404 || error.status == 400) {
            return res.status(400).json({ error: 'Invalid Phone Number' })
        }

        res.status(500).json({ error: 'An error occurred on the server'});
    }

}
