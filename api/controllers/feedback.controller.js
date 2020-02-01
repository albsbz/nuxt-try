const mailer = require("../mail/default")

module.exports.create=async (req,res)=>{
    try {
        const feedback = {
            name: req.body.name,
            email: req.body.email,
            text: req.body.text,
        }
       const info=await mailer.send({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: `<b>Hello world?</b>
                    <div>Name: ${feedback.name}</div>
                    <div>Email: ${feedback.email}</div>
                    <div>Text: ${feedback.text}</div>`// html body
        })
        res.status(201).json(info)
    } catch (e) {
        res.status(500).json(e)
    }
}