const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const twilio = require('twilio');

dotenv.config();

const app = express();
const port = 5000;


app.use(cors());
app.use(express.json());

// Initialize Twilio client
const client = new twilio.Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Route to send an SMS
app.post('/sms', async (req, res) => {
    const { to } = req.body;

    try {
        // Send an SMS
        await client.messages.create({
            body: 'This is a test SMS from your Twilio-powered server!',
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
});


//route to send call:
app.post('/call', async (req, res) => {
    const { to } = req.body;

    try {
        // Make a call
        const call = await client.calls.create({
            url: 'http://demo.twilio.com/docs/voice.xml', // TwiML for the call
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
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
