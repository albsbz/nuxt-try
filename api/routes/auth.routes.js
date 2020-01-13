const {Router}=require('express')
const router=Router()
const {login, createUser}=require('../controllers/auth.controller')
const passport=require('passport')

// /api/auth/admin/login
router.post('/admin/login', login)
router.post('/admin/create', passport.authenticate('jwt', {session:false}), createUser)

module.exports=router