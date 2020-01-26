const {Router}=require('express')
const router=Router()
const {login, createUser}=require('../controllers/auth.controller')
const passport=require('passport')

// /api/auth....
router.post('/login', login)
// router.post('/logout', logout)
router.post('/admin/users/create', createUser)

module.exports=router