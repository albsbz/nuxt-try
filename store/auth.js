import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export const state=()=>({
 token:null
})

export const mutations={
 setToken(state, token){
    state.token=token
 },
 clearToken(state){
    state.token=null
 }
}

export const actions={
   
    async login({commit, dispatch}, formData){
            // const token=await new Promise((resolve, reject)=>{
            //     setTimeout(()=>resolve('mock-token'), 2000)
            // })
            await this.$axios.$post('/api/auth/login', formData)
              .then(function ({token}) {
                dispatch('setToken', token)
              })
              .catch(function (e) {
                commit('setError', e, {root:true})
                throw e
              });

    },
    setToken({commit}, token){
        this.$axios.setToken(token, 'Bearer')
        commit('setToken', token)
        Cookies.set('jwt-token', token)
    },
    logout({commit}){
        this.$axios.setToken(false)
        commit('clearToken')
        Cookies.remove('jwt-token')
    },
    async createUser({commit}, formData){
        try {
            await this.$axios.$post('/api/auth/admin/users/create', formData)

        } catch (e) {
            commit('setError', e, {root:true})
            throw e
        }
    },
    autoLogin({dispatch}){
        const cookieStr = process.client
      ? document.cookie
      : this.app.context.req.headers.cookie

      const cookies = Cookie.parse(cookieStr || '') || {}
      const token = cookies['jwt-token']

      if (isJWTValid(token)) {
        dispatch('setToken', token)
      } else {
        dispatch('logout')
      }
    }
   
}

export const getters={
    isAuth: state=>Boolean(state.token),
    token: state=>state.token
}

function isJWTValid(token) {
    if (!token) {
      return false
    }
  
    const jwtData = jwtDecode(token) || {}
    const expires = jwtData.exp || 0
  
    return (new Date().getTime() / 1000) < expires
  }