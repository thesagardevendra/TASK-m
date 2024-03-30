const express = require('express')
const loginController = require('../controller/login-controller')

const loginRoutes = () => {
    const router = express.Router()
    router.post('/', loginController.userCheck)

    return router
}

module.exports = loginRoutes;
