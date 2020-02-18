const nodemailer = require("nodemailer");

module.exports.send =async function(payload){
    try {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass // generated ethereal password
            }
        });

        // send mail with defined transport object
        await transporter.sendMail(payload)
        let info = await transporter.sendMail(payload);
        return nodemailer.getTestMessageUrl(info)
    } catch (e) {
        throw e
    }
}
module.exports.sendToken =async function(token){
    try {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass // generated ethereal password
            }
        });
        
        // send mail with defined transport object
        await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: `<b>Hello world?</b>
                    <div>Token: <a href="${process.env.BASE_URL}/auth/token/${token}"></a></div>`// html body
        })
        let info = await transporter.sendMail(payload);
        return nodemailer.getTestMessageUrl(info)
    } catch (e) {
        throw e
    }
}