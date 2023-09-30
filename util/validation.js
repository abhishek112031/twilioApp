
const twilio = require('twilio');
const client = new twilio.Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
async function isValidPhoneNumber(to) {
    try {

        const number = await client.lookups.
            v1.phoneNumbers(to)
            .fetch({ type: ['carrier'] });
            return number.carrier.type === 'mobile';
       
    }
    catch(err){
        // console.log("isValiderr==>",err)
        // console.error('Error checking phone number:', err);
        throw err; 
    }
}

module.exports = {
    isValidPhoneNumber
};






