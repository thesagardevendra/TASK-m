const express = require('express')
const userFetchRoutesController = require('../controller/userFetch-controller')

const userFetchRoutes = () => {
    const router = express.Router()
    router.post('/userFetchTeamKeyWise', userFetchRoutesController.userFetchTeamKeyWise);
    return router
}

module.exports = userFetchRoutes;
