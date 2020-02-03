// import { getAnalytics } from "../api/controllers/post.controller"

export const actions={
    async fetchAdminUsers({commit}){
        try {
            return await this.$axios.$get('/api/user/admin')
        } catch (e) {
            commit('setError', e, {root:true})
            throw e
        }
    },
    // async fetch({commit}){
    //     try {
    //         return await this.$axios.$get('/api/user')
    //     } catch (e) {
    //         commit('setError', e, {root:true})
    //         throw e
    //     }
    // },
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
    async update({commit}, {text, id}){
        // try {
        //     return await this.$axios.$put(`/api/post/admin/${id}`, {text})
        // } catch (e) {
        //     commit('setError', e, {root:true})
        //     throw e
        // }
    },
    async create({commit}, {title, text, image}){
        // try {
        //     const fd=new FormData()
        //     fd.append('title', title)
        //     fd.append('text', text)
        //     fd.append('image', image, image.name)
        //     return await this.$axios.$post('/api/post/admin', fd)
            
        // } catch (e){
        //     commit('setError', e, {root:true})
        //     throw e
        // }
    },
    async fetchAdminById({commit}, id){
        // try {
        //     return await this.$axios.$get(`/api/post/admin/${id}`)
        // } catch (e) {
        //     commit('setError', e, {root:true})
        //     throw e
        // }
    },
    // async fetchById({commit}, id){
    //     try {
    //         return await this.$axios.$get(`/api/user/${id}`)
    //     } catch (e) {
    //         commit('setError', e, {root:true})
    //         throw e
    //     }
    // },
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
            console.log(1)
            const res=await this.$axios.$put(`/api/user/update/${rootState.auth.currentUser.id}`, {formData})
            commit('auth/setCurrentUserName', formData.name, {root:true})
            return res
        } catch (e) {
            commit('setError', e, {root:true})
            throw e
        }
    }
}