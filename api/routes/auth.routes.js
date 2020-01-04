const {Router}=require('express')
const router=Router()
const {login, createUser}=require('../controllers/auth.controller')

// /api/auth/admin/login
router.post('/admin/login', login)
router.post('/admin/create', createUser)

module.exports=router