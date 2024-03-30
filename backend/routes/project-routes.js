const express = require('express')
const projectController = require('../controller/project-controller')

const projectRoutes = () => {
    const router = express.Router()
    router.post('/createProject', projectController.createProject);
    router.post('/fetchProject', projectController.fetchProject)
    router.post('/updateProjectFavourite', projectController.updateProjectFavourite),
    router.post('/deleteProject', projectController.deleteProject)
    return router
}

module.exports = projectRoutes;
