const OTPRoutes = require('../routes/OTP-routes');
const loginRoutes = require('../routes/login-routes');
const projectRoutes = require('../routes/project-routes');
const registrationRoutes = require('../routes/registrations-route')

const registerRoutes = (app) => {
    app.get('/', (req, res) => {
        res.json({
            message: "server port is running"

        })
    })
    app.use('/api/registration', registrationRoutes());
    app.use('/api/login', loginRoutes())
    app.use('/api/verifyOTP', OTPRoutes())
    app.use('/api', projectRoutes())
}

module.exports = registerRoutes