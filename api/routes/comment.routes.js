const {Router}=require('express')
const {create}=require('../controllers/comment.controller')
const router=Router()
const passport=require('passport')
//api/comment
router.post(
    '/', 
    passport.authenticate('jwt', {session:false}),
    create
)
module.exports=router