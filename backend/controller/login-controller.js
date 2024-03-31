const { connectToMongoDB, closeMongoDBConnection } = require("../db/mongoDbConnection");
const fieldDuplication = require("../utils/fieldDuplication");
const validateField = require("../utils/validateField");
const userCheck = async (req, res) => {
    // const data = await collection.find({}).toArray();
    let DBConnection;
    const allowedFields = ['username', 'password'];
    const { username, password } = req.body;
    try {
        fieldDuplication(req, allowedFields)
        validateField(password, 'string', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%&]).{10,}$/);
        validateField(username, 'string', /^[a-zA-Z0-9._%+-]+@gmail\.com$/);
        DBConnection = await connectToMongoDB();
        const registrationCollection = DBConnection.collection('registration');
        const checkDuplicateRegistration = await registrationCollection.findOne({ email: username });
        console.log(checkDuplicateRegistration);
        if (checkDuplicateRegistration && checkDuplicateRegistration.email === username && checkDuplicateRegistration.password === password) {
            return res.status(200).json({
                statusCode: 200, message: "Login successful", userDetails: {
                    userName: checkDuplicateRegistration.fullName,
                    userEmail: checkDuplicateRegistration.email,
                    userPhoneNumber: checkDuplicateRegistration.mobile,
                    userTeamKey:checkDuplicateRegistration.teamKey
                }
            })
        } else {
            return res.status(200).json({ statusCode: 401, message: "unauthorized user" })
        }
    } catch (error) {
        console.log(error);
        if (error === 'Unprocessable Entity') {
            return res.status(422).json({ statusCode: 422, message: error })
        } else if (error === "fieldDuplication") {
            return res.status(451).json({ statusCode: 451, message: "Unavailable for Legal Reasons", })
        } else {
            return res.status(500).json({ statusCode: 500, message: 'Internal Server Error' })
        }
    } finally {
        if (DBConnection) {
            closeMongoDBConnection(DBConnection);
        }
    }
};



module.exports = {
    userCheck,
};