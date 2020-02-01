const {model, Schema}=require('mongoose')
const userSchema=new Schema({
    email: {
        type: String,
        unique: true,
        required:true
    },
    name: {
        type: String,
        required:true,
    },
    // token:{
    //     type: String,
    //     required:true,
    //     default:''
    // },
    password: {
        type: String,
        required:true,
        minLength: 6
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports=model('users', userSchema)