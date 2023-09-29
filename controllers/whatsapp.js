const dotenv = require('dotenv');
dotenv.config();

const twilio = require('twilio');


const client = new twilio.Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendWhatsappMessage = async (req, res, next) => {
    const { to } = req.body;

    try {
        // Send a WhatsApp message
        await client.messages.create({
            body: 'This is a WhatsApp test message from Twilio-powered server!',
            from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
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
