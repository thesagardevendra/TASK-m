const randomOTP = () => {
    const OTP = Math.floor(100000 + Math.random() * 900000);
    return OTP.toString();
};

module.exports = randomOTP;