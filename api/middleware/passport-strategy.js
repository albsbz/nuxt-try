const {Strategy, ExtractJwt}=require('passport-jwt')
const {model}=require('mongoose')
const {JWT}=require('../keys')
const User=model('users')

//Autherization: Bearer Token
const options={
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT
}

    module.exports=new Strategy(options, async (payload, done)=>{
        try {
          const user=await User.findById(payload.userId).select('id')
          if (user){
              done(null, user)
          }else{
              done(null, false)
          }
        } catch (error) {
            console.error(error)
        }
})