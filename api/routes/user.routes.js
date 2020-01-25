const passport=require('passport')
const {Router}=require('express')
const router=Router()
const ctr=require('../controllers/user.controller')

// // /api/user
//Admin
// router.post(
//     '/admin/',
//     passport.authenticate('jwt', {session:false}),
//     upload.single('image'),
//     ctr.create
// )
router.get(
    '/admin/',
    passport.authenticate('jwt', {session:false}),
    ctr.getAll
)
// router.get(
//     '/admin/get/analytics',
//     passport.authenticate('jwt', {session:false}),
//     ctr.getAnalytics
// )
// router.get(
//     '/admin/:id',
//     passport.authenticate('jwt', {session:false}),
//     ctr.getById
// )
// router.put(
//     '/admin/:id',
//     passport.authenticate('jwt', {session:false}),
//     ctr.update
// )
router.delete(
    '/admin/:id',
    passport.authenticate('jwt', {session:false}),
    ctr.remove
),
router.put(
    '/admin/toggle-status/:id',
    passport.authenticate('jwt', {session:false}),
    ctr.toggleStatus
)

//noAdmin
// router.get(
//     '/',
//     ctr.getAll
// )
// router.get(
//     '/:id',
//     ctr.getById
// )
// router.put(
//     '/add/view/:id',
//     ctr.addView
// )


// const {login, createUser}=require('../controllers/auth.controller')

// router.post('/admin/login', login)
// router.post('/admin/create', createUser)

module.exports=router