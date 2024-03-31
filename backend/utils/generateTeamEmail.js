function generateTeamEmail(gmail, teamKey, mobileNumber) {
    // Extract the username part before the '@' symbol
    const username = gmail.split('@')[0];
    // Extract the last four digits of the mobile number
    const lastFourDigits = mobileNumber.slice(-4);
    // Generate the new email address
    const newEmail = `${username}${teamKey}${lastFourDigits}`;
    return newEmail;
   }
 

module.exports = generateTeamEmail;
