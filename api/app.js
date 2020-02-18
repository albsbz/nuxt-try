const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const passportStrategy=require('./middleware/passport-strategy')

const authRoutes=require('./routes/auth.routes')
const postRoutes=require('./routes/post.routes')
const userRoutes=require('./routes/user.routes')
const commentRoutes=require('./routes/comment.routes')
const feedbackRoutes=require('./routes/feedback.routes')
const keys = require('./keys')
const app = express()

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(keys.MONGO_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch(error => console.error(error))

app.use(passport.initialize())
passport.use(passportStrategy)
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)
app.use('/api/user', userRoutes)
app.use('/api/comment', commentRoutes)
app.use('/api/feedback', feedbackRoutes)



module.exports = app
