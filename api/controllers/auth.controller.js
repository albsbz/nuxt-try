const bcrypt = require('bcryptjs')
const jwt= require('jsonwebtoken')
const keys=require('../keys')
const User= require('../models/user.model')
const mailer = require("../mail/default")

module.exports.login=async (req, res)=>{

    const user=await User.findOne({email: req.body.email})
    if (user){
        const passCorrect=bcrypt.compareSync(req.body.password, user.password)
        if (passCorrect){
            const token=jwt.sign({
                email:user.email,
                userId:user._id,
                role:user.isAdmin?'admin':'user'
            }, keys.JWT, {expiresIn:60*60})
            res.json({
                token,
                publicUserData:{
                    name:user.name,
                    avatar:user.avatar,
                    description:user.description
                }
            })
        }
        else{
            res.status(404).json({message: 'Пользователь не найден'})
        }
    } else {
        res.status(404).json({message:'Пользователь не найден'})
    }
}

module.exports.createUser=async (req, res)=>{
    let user=await User.findOne({email: req.body.email})
    if (user){
        res.status(409).json({message: 'Е-меил уже занят'})
    } else{
        const salt=bcrypt.genSaltSync(10)
        // const token=Math.random().toString(36).substring(7);
        user=new User({
            name:req.body.name,
            email:req.body.email,
            password:bcrypt.hashSync(req.body.password,salt),
            // token
        })
        await user.save()
        // mailInfo=await mailer.sendToken(token)
        res.status(201).json(user)
    }
}