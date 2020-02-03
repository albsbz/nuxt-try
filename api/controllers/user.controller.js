const User= require('../models/user.model')
module.exports.create=async (req, res)=>{
    // const post=new Post({
    //     title:req.body.title,
    //     text:req.body.text,
    //     imageUrl:`/${req.file.filename}`,
    // })
    // try {
    //     await post.save(
    //     res.status(201).json(post)
    //     )
    // } catch (e) {
    //     res.status(500).json(e)
    // }
}

module.exports.getAll=async (req, res)=>{
    try {
        const user= await User.find().sort({isAdmin:-1})
        res.json(user)
    } catch (e) {
        res.status(500).json(e)
    }
    
},

module.exports.getById=async (req, res)=>{
    try {
        const user=await User.findById(req.params.id)
            .select('description')
            .select('name')
            .exec((e, user)=>{
                res.json(user)
            }
        )
    } catch (e) {
        res.status(500).json(e)
    }
}
module.exports.update=async (req, res)=>{
    try {
        const $set={
            name: req.body.formData.name,
            description: req.body.formData.description,
        }
        const user= await User.findOneAndUpdate({
           _id: req.params.id,
        }, {$set}, {new:true})
        res.json(user)
    } catch (e) {
        res.status(500).json(e)
    }
}
module.exports.remove=async (req, res)=>{
    try {
       await User.deleteOne({
            _id: req.params.id
       })
        res.json({message:'Пользователь удален'})
    } catch (e) {
        res.status(500).json(e)
    }
}
module.exports.toggleStatus=async (req, res)=>{
    try {
       const userToToggle= await User.findOne({
            _id: req.params.id
       })
       userToToggle.isAdmin=!userToToggle.isAdmin
       await userToToggle.save()
        res.json({message:'Статус изменен'})
    } catch (e) {
        res.status(500).json(e)
    }
}
