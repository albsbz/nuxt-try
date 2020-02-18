import Cookie from 'cookie'
import Cookies from 'js-cookie'

export const actions={
    async fetchAdminUsers({commit}){
        try {
            return await this.$axios.$get('/api/user/admin')
        } catch (e) {
            commit('setError', e, {root:true})
            throw e
        }
    },
    
    async delete({commit}, id){
        try {
            return await this.$axios.$delete(`/api/user/admin/${id}`)
        } catch (e) {
            commit('setError', e, {root:true})
            throw e
        }
    },
    async toggleStatus({commit}, id){
        try {
            return await this.$axios.$put(`/api/user/admin/toggle-status/${id}`)
        } catch (e) {
            commit('setError', e, {root:true})
            throw e
        }
    },

    async fetchCurrentUser({commit, rootState}){
        try {
            return await this.$axios.$get(`/api/user/${rootState.auth.currentUser.id}`)
        } catch (e) {
            commit('setError', e, {root:true})
            throw e
        }
    },
    async updateCurrentUser({commit, rootState}, formData){
        try {
            const fd=new FormData()
            fd.append('name', formData.name)
            fd.append('description', formData.description)
            fd.append('avatar', formData.avatar)
            const res=await this.$axios.$put(`/api/user/update/${rootState.auth.currentUser.id}`, fd)
            // commit('auth/setCurrentUserName', formData.name, {root:true})
            commit('auth/setCurrentUserName', res.name, {root:true})
            commit('auth/setCurrentUserDescription', res.description, {root:true})
            commit('auth/setCurrentUserAvatar', res.avatar, {root:true})
            const cookie=Object.assign(Cookies.get('user-data'))
            console.log(cookie)
            Cookies.set('user-data', JSON.stringify({
                name:res.name,
                description:res.description,
                avatar:res.avatar,
                id:cookie.id
            }))
            return res
        } catch (e) {
            commit('setError', e, {root:true})
            throw e
        }
    }
}