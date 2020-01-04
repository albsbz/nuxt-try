
export const state=()=>({
 token:true
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
        try{
            // const token=await new Promise((resolve, reject)=>{
            //     setTimeout(()=>resolve('mock-token'), 2000)
            // })
            this.$axios.$post('/api/auth/admin/login', formData)
              .then(function ({token}) {
                console.log(token)
                dispatch('setToken', token)
              })
              .catch(function (e) {
                throw e
              });
        } catch (e){
            commit('setError', e, {root:true})
            throw e
        }
    },
    setToken({commit}, token){
        commit('setToken', token)
    },
    logout({commit}){
        commit('clearToken')
    },
    async createUser({commit}, formData){
        try {
            console.log(formData)
        } catch (error) {
            
        }
    }
}

export const getters={
    isAuth: state=>Boolean(state.token)
}