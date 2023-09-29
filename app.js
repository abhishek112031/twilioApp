const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config();


//routes:
const smsRoute = require('./routes/sms');
const callRoute = require('./routes/call');
const whatsappRoute = require('./routes/whatsapp')

const app = express();
// const port = 5000;

//common middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//main middlewares:
app.use(smsRoute);
app.use(callRoute);
app.use(whatsappRoute);



// Start the server
app.listen(process.env.port || 5000, () => {
    console.log(`Server is running on port ${process.env.port}`);
});
