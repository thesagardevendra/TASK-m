const express = require('express');
const config = require('./utils/config');
const registerRoutes = require('./utils/register-routes');
const app = express()
config(app);
registerRoutes(app)
app.listen(process.env.PORT, () => console.log(`server is running on ${process.env.PORT}`))