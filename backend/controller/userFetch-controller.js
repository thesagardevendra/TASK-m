const { connectToMongoDB, closeMongoDBConnection } = require("../db/mongoDbConnection");
const fs = require('fs')
const randomOTP = require("../utils/randomOTP")
const fieldDuplication = require("../utils/fieldDuplication");
const sendMail = require("../utils/sendMail");
const validateField = require("../utils/validateField");
const handlebars = require('handlebars');
const generateTeamEmail = require("../utils/generateTeamEmail");

const  userFetchTeamKeyWise= async (req, res) => {
    // const data = await collection.find({}).toArray();
    let DBConnection;
    const allowedFields = ['teamKey', 'email'];
    const { teamKey, email } = req.body;
    try {
        fieldDuplication(req, allowedFields)
        validateField(teamKey, 'string');
        validateField(email, 'string', /^[a-zA-Z0-9._%+-]+@gmail\.com$/);
        DBConnection = await connectToMongoDB();
        const userCollection = DBConnection.collection('user');
        const fetchUserData = await userCollection.find({ teamKey: teamKey }).toArray();
        // setTimeout(() => {
        if (fetchUserData) { return res.status(200).json({ statusCode: 200, message: "Data Fetched successfully", data: fetchUserData }) }
        // With E-mail
        // fs.readFile('./template/verifyAccount.hbs', 'utf8', (err, htmlContent) => {
        //     if (err) {
        //         console.log(err);
        //         return res.status(500).json({ statusCode: 500, message: 'Internal Server Error' })
        //     }
        //     const template = handlebars.compile(htmlContent);

        //     const dynamicData = {
        //         OTP: randomOTP()
        //     }
        //     const html = template(dynamicData);
        //     const handleSendEmailError = function (err) {
        //         console.log(err);
        //         return res.status(500).json({ statusCode: 500, message: 'Internal Server Error' })
        //     };
        //     const handleSendEmailSuccess = async function (info) {
        //         const OTPInfoCollection = DBConnection.collection('OTPInfo');

        //         const findOTPInfoData = await OTPInfoCollection.findOne({ userEmail: email });
        //         if (findOTPInfoData && findOTPInfoData.userEmail === email) {
        //             const result = await OTPInfoCollection.updateOne({
        //                 userEmail: email,
        //             }, { $set: { OTPNumber: dynamicData.OTP, modifiedAt: new Date() } });
        //             if (result && info.response) { return res.status(200).json({ statusCode: 200, message: "OTP re-sent successfully to the registered email account" }) }
        //         } else {
        //             const result = await OTPInfoCollection.insertOne({
        //                 OTPNumber: dynamicData.OTP,
        //                 OTPSentGmail: 'true',
        //                 userFullName: fullName,
        //                 userPassword: password,
        //                 userEmail: email,
        //                 userMobileNumber: mobile,
        //                 createdAt: new Date(),
        //                 modifiedAt: new Date()
        //             });
        //             if (result && info.response) { return res.status(200).json({ statusCode: 200, message: "OTP sent successfully to the registered email account" }) }
        //         }


        //     }
        //     sendMail(email, `TASK-M Verification Code: ${dynamicData.OTP}`, html, handleSendEmailError, handleSendEmailSuccess);
        // });

    } catch (error) {
        console.log(error);
        if (error === 'Unprocessable Entity') {
            return res.status(422).json({ statusCode: 422, message: error })
        } else if (error === "fieldDuplication") {
            return res.status(451).json({ statusCode: 451, message: "Unavailable for Legal Reasons", })
        }
        else {
            return res.status(500).json({ statusCode: 500, message: 'Internal Server Error' })
        }
    } finally {
        if (DBConnection) {
            closeMongoDBConnection(DBConnection);
        }
    }
};

module.exports = {
    userFetchTeamKeyWise,
};

