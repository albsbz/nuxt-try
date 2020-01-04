const Post= require('../models/post.model')
module.exports.create=async (req, res)=>{
    // let user=await User.findOne({login: req.body.login})
    // if (user){
    //     res.status(409).json({message: 'Логин уже занят'})
    // } else{
    //     const salt=bcrypt.genSaltSync(10)
    //     user=new User({
    //         login:req.body.login,
    //         password:bcrypt.hashSync(req.body.password,salt)
    //     })
    //     await user.save()
    //     res.status(201).json(user)
    // }
}

module.exports.getAll=async (req, res)=>{

}
module.exports.getById=async (req, res)=>{
    
}
module.exports.update=async (req, res)=>{
    
}
module.exports.remove=async (req, res)=>{
    
}
module.exports.addView=async (req, res)=>{
    
}
