function isValidPhoneNumber(phoneNumber) {
    // Define a regular expression pattern for a valid phone number
    const phonePattern = /^\+\d{12}$/;

    // Test the input phoneNumber against the pattern
    return phonePattern.test(phoneNumber);
}
module.exports = {
    isValidPhoneNumber
};