

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