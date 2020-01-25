const {model, Schema}=require('mongoose')
const userSchema=new Schema({
    login: {
        type: String,
        unique: true,
        required:true
    },
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