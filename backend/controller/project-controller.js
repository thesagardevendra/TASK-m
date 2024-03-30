const { connectToMongoDB, closeMongoDBConnection } = require("../db/mongoDbConnection");
const fs = require('fs')
const randomOTP = require("../utils/randomOTP")
const fieldDuplication = require("../utils/fieldDuplication");
const sendMail = require("../utils/sendMail");
const validateField = require("../utils/validateField");
const handlebars = require('handlebars');

const createProject = async (req, res) => {
    // const data = await collection.find({}).toArray();
    let DBConnection;
    const allowedFields = ['projectName', 'projectTemplate', 'projectKey', 'reporterEmail', 'reporterName', 'favourite'];
    const { projectName, projectTemplate, projectKey, reporterEmail, reporterName, favourite } = req.body;
    try {
        fieldDuplication(req, allowedFields)
        validateField(projectName, 'string', /^[A-Za-z0-9_ ]+$/);
        validateField(projectTemplate, 'string', /^[A-Za-z0-9]+$/);
        validateField(projectKey, 'string', /^[A-Z]+$/);
        validateField(reporterEmail, 'string', /^[a-zA-Z0-9._%+-]+@gmail\.com$/);
        validateField(reporterName, 'string');
        validateField(favourite, 'string');
        DBConnection = await connectToMongoDB();
        const projectCollection = DBConnection.collection('project');
        const checkDuplicateProjectName = await projectCollection.findOne({ projectName: projectName });
        if (checkDuplicateProjectName && checkDuplicateProjectName.projectName === projectName) { return res.status(200).json({ statusCode: 409, message: "Project Name already registred" }) }

        const result = await projectCollection.insertOne({
            projectName: projectName,
            projectTemplate: projectTemplate,
            projectKey: projectKey,
            reporterEmail: reporterEmail,
            reporterName: reporterName,
            favourite: favourite,
            createdAt: new Date(),
            modifiedAt: new Date()
        });
        if (result) { return res.status(200).json({ statusCode: 200, message: "Project Added Successfully" }) }

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


const fetchProject = async (req, res) => {
    // const data = await collection.find({}).toArray();
    let DBConnection;
    const allowedFields = ['reporterEmail'];
    const { reporterEmail, } = req.body;
    try {
        fieldDuplication(req, allowedFields)
        validateField(reporterEmail, 'string', /^[a-zA-Z0-9._%+-]+@gmail\.com$/);
        DBConnection = await connectToMongoDB();
        const projectCollection = DBConnection.collection('project');
        const fetchProjectName = await projectCollection.find({ reporterEmail: reporterEmail }).toArray();
        console.log(fetchProjectName);
        // setTimeout(() => {
        if (fetchProjectName) { return res.status(200).json({ statusCode: 200, message: "Data Fetched successfully", data: fetchProjectName }) }

        // }, 90000);

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


const updateProjectFavourite = async (req, res) => {
    // const data = await collection.find({}).toArray();
    let DBConnection;
    const allowedFields = ['projectName', 'favouriteValue'];
    const { projectName, favouriteValue } = req.body;
    try {
        fieldDuplication(req, allowedFields)
        validateField(projectName, 'string', /^[A-Za-z0-9_ ]+$/);
        validateField(favouriteValue, 'string',);
        DBConnection = await connectToMongoDB();
        const projectCollection = DBConnection.collection('project');
        const updateProjectFav = await projectCollection.updateOne({ projectName: projectName }, { $set: { favourite: favouriteValue, modifiedAt: new Date() } });
        // setTimeout(() => {
        if (updateProjectFav) { return res.status(200).json({ statusCode: 200, message: "Data Fetched successfully" }) }

        // }, 90000);

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

const deleteProject = async (req, res) => {
    // const data = await collection.find({}).toArray();
    let DBConnection;
    const allowedFields = ['projectName'];
    const { projectName } = req.body;
    try {
        fieldDuplication(req, allowedFields)
        validateField(projectName, 'string', /^[A-Za-z0-9_ ]+$/);
        DBConnection = await connectToMongoDB();
        const projectCollection = DBConnection.collection('project');
        const deletProject = await projectCollection.deleteOne({ projectName: projectName });
        // setTimeout(() => {
        if (deletProject) { return res.status(200).json({ statusCode: 200, message: "Data Fetched successfully" }) }

        // }, 90000);

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
    createProject,
    fetchProject,
    updateProjectFavourite,
    deleteProject,
};
