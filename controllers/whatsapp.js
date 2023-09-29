const dotenv = require('dotenv');
dotenv.config();

//importing validation function:
const { isValidPhoneNumber } = require('../util/validation');

// const twilio = require('twilio');
// const client = new twilio.Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);//or

const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendWhatsappMessage = async (req, res, next) => {
    const { to, message } = req.body;

    try {
        if (!isValidPhoneNumber(to)) {
            // console.log('phone: ',to)

            return res.status(400).json({ error: 'Invalid phone number' });
        }
        // Send a WhatsApp message
        await client.messages.create({
            from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
            body: message,
            to: `whatsapp:${to}`,
        });

        
        // Respond with success
        res.status(200).json({ message: 'WhatsApp message sent successfully' });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'An error occurred on the server' });
    }


}
