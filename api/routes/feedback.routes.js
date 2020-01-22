const {Router}=require('express')
const {create}=require('../controllers/feedback.controller')
const router=Router()
//api/feedback
router.post('/', create)
module.exports=router