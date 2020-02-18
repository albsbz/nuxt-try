const Comment=require('../models/comment.model')
const Post=require('../models/post.model')
const Author=require('../models/user.model')

module.exports.create=async (req,res)=>{
    try {
        const author=await Author.findById(req.body.author)
        const comment = new Comment({
            text: req.body.text,
            postId:req.body.postId,
            author:author,
        })
        await comment.save()
        const post=await Post.findById(req.body.postId)
        post.comments.push(comment._id)
        await post.save()
        res.status(201).json(comment)
        // newComment.populate('author').exec((e, comment)=>{
            
        //     return res.status(201).json(comment)
        // })

        
    } catch (e) {
        console.log(e)
        res.status(500).json(e)
    }
}