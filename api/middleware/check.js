import jwtDecode from 'jwt-decode'
import Cookie from 'cookie'

module.exports.adminRole=(req, res, next)=>{
    if (jwtDecode(Cookie.parse(req.headers.cookie)['jwt-token']).role==='admin'){   
        next()
    } else {
        res.status(403).send('Access denied.')
    }
}