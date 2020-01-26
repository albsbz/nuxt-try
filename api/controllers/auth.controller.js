const bcrypt = require('bcryptjs')
const jwt= require('jsonwebtoken')
const keys=require('../keys')
const User= require('../models/user.model')

module.exports.login=async (req, res)=>{
    const user=await User.findOne({login: req.body.login})
    if (user){
        const passCorrect=bcrypt.compareSync(req.body.password, user.password)
        if (passCorrect){
            const token=jwt.sign({
                login:user.login,
                userId:user._id
            }, keys.JWT, {expiresIn:60*60})
            res.json({token})
        }
        else{
            res.status(404).json({message: 'Пользователь не найден'})
        }
    } else {
        res.status(404).json({message:'Пользователь не найден'})
    }
}

module.exports.createUser=async (req, res)=>{
    let user=await User.findOne({login: req.body.login})
    if (user){
        res.status(409).json({message: 'Логин уже занят'})
    } else{
        const salt=bcrypt.genSaltSync(10)
        user=new User({
            login:req.body.login,
            password:bcrypt.hashSync(req.body.password,salt)
        })
        await user.save()
        res.status(201).json(user)
    }
}