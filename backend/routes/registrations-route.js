const express = require('express')
const registrationController = require('../controller/registration-controller')


const registrationRoutes = () => {
    const router = express.Router()
    router.post('/', registrationController.userRegister)

    return router
}

module.exports = registrationRoutes;
