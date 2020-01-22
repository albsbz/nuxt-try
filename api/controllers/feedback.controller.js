const nodemailer = require("nodemailer");

module.exports.create=async (req,res)=>{
    try {
        const feedback = {
            name: req.body.name,
            email: req.body.email,
            text: req.body.text,
        }
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
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: `<b>Hello world?</b>
                    <div>Name: ${feedback.name}</div>
                    <div>Email: ${feedback.email}</div>
                    <div>Text: ${feedback.text}</div>`// html body
        });

        // res.status(201).json(nodemailer.getTestMessageUrl(info));
        res.status(201).json();
    } catch (e) {
        res.status(500).json(e)
    }
}