const passport=require('passport')
const {Router}=require('express')
const router=Router()
const upload=require('../middleware/upload')
const ctr=require('../controllers/post.controller')
const check=require('../middleware/check')

// // /api/post
//Admin
router.post(
    '/admin/',
    passport.authenticate('jwt', {session:false}),
    upload.single('image'),
    check.adminRole,
    ctr.create
)
router.get(
    '/admin/',
    passport.authenticate('jwt', {session:false}),
    check.adminRole,
    ctr.getAll
)
router.get(
    '/admin/get/analytics',
    passport.authenticate('jwt', {session:false}),
    check.adminRole,
    ctr.getAnalytics
)
router.get(
    '/admin/:id',
    passport.authenticate('jwt', {session:false}),
    check.adminRole,
    ctr.getById
)
router.put(
    '/admin/:id',
    passport.authenticate('jwt', {session:false}),
    check.adminRole,
    ctr.update
)
router.delete(
    '/admin/:id',
    passport.authenticate('jwt', {session:false}),
    check.adminRole,
    ctr.remove
)
//noAdmin
router.get(
    '/',
    ctr.getAll
)
router.get(
    '/:id',
    ctr.getById
)
router.put(
    '/add/view/:id',
    ctr.addView
)


// const {login, createUser}=require('../controllers/auth.controller')

// router.post('/admin/login', login)
// router.post('/admin/create', createUser)

module.exports=router