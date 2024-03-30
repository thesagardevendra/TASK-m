const nodemailer = require('nodemailer');


const sendMail = (to, subject, text, errCallback, successCallback) => {
    let transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sagarselvaraj059@gmail.com',
            pass: 'qmet yhwl dywv hggk',
        }
    })
    let mailOptions = {
        from: 'sagarselvaraj059@gmail.com',
        to: to,
        subject: subject,
        html: text
    }
    transport.sendMail(mailOptions, (err, info) => {
        if (err) {
            if (errCallback) {
                errCallback(err)
            }
            return err
        } else {
            if (successCallback) {
                successCallback(info)
            }
        }
    })
};

module.exports = sendMail;
