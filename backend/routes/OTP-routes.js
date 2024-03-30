const express = require('express')
const OTPController = require('../controller/OTP-controller')

const OTPRoutes = () => {
    const router = express.Router()
    router.post('/', OTPController.verifyOTP)

    return router
}

module.exports = OTPRoutes;