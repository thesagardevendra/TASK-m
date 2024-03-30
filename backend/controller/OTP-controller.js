const { connectToMongoDB, closeMongoDBConnection } = require("../db/mongoDbConnection");
const fieldDuplication = require("../utils/fieldDuplication");
const validateField = require("../utils/validateField");
const fs = require('fs');
const handlebars = require('handlebars');
const sendMail = require("../utils/sendMail");

const verifyOTP = async (req, res) => {
    const allowedFields = ['email', 'OTP'];
    const { email, OTP } = req.body;
    let DBConnection;
    try {
        fieldDuplication(req, allowedFields)
        validateField(email, 'string', /^[a-zA-Z0-9._%+-]+@gmail\.com$/);
        validateField(OTP, 'string', /^[0-9]{1,6}$/);
        DBConnection = await connectToMongoDB();
        const OTPInfoCollection = DBConnection.collection('OTPInfo');
        const registrationCollection = DBConnection.collection('registration');
        const findOTPInfoData = await OTPInfoCollection.findOne({ userEmail: email });

        if (findOTPInfoData && findOTPInfoData.OTPNumber === OTP) {
            const deleteOTPInfoData = await OTPInfoCollection.deleteOne({ userEmail: email });
            if (deleteOTPInfoData) {
                const result = await registrationCollection.insertOne({
                    fullName: findOTPInfoData.userFullName,
                    password: findOTPInfoData.userPassword,
                    email: email,
                    mobile: findOTPInfoData.userMobileNumber,
                    createdAt: new Date(),
                    modifiedAt: new Date()
                });

                if (result) {
                    return res.status(200).json({ statusCode: 200, message: "Registration sucessfully" })
                }
            }
            // With E-mail
            // fs.readFile('./template/welcomeLetter.hbs', 'utf8', (err, htmlContent) => {
            //     if (err) {
            //         console.log(err);
            //         return res.status(500).json({ statusCode: 500, message: 'Internal Server Error' })
            //     }
            //     const template = handlebars.compile(htmlContent);

            //     const dynamicData = {
            //         username: findOTPInfoData.userFullName
            //     }
            //     const html = template(dynamicData);
            //     const handleSendEmailError = function (err) {
            //         console.log(err);
            //         return res.status(500).json({ statusCode: 500, message: 'Internal Server Error' })
            //     };
            //     const handleSendEmailSuccess = async function (info) {
            //         const deleteOTPInfoData = await OTPInfoCollection.deleteOne({ userEmail: email });
            //         if (deleteOTPInfoData) {
            //             const result = await registrationCollection.insertOne({
            //                 fullName: findOTPInfoData.userFullName,
            //                 password: findOTPInfoData.userPassword,
            //                 email: email,
            //                 mobile: findOTPInfoData.userMobileNumber,
            //                 createdAt: new Date(),
            //                 modifiedAt: new Date()
            //             });

            //             if (result) {
            //                 return res.status(200).json({ statusCode: 200, message: "Registration sucessfully" })
            //             }
            //         }
            //     }
            //     sendMail(email, `Welcome to TASK-M`, html, handleSendEmailError, handleSendEmailSuccess);
            // })
        } else {
            return res.status(200).json({ statusCode: 200, message: "Invalid OTP" })
        }

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
}


module.exports = {
    verifyOTP
}

// const result = await registrationCollection.insertOne({
//     fullName: fullName,
//     password: password,
//     email: email,
//     mobile: mobile,
//     createdAt: new Date(),
//     modifiedAt: new Date()
// });