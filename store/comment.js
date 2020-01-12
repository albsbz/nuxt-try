
export const actions={
    async create({commit}, fd){
        try {
            return await this.$axios.$post('/api/comment', fd)
        } catch (e) {
            commit('setError', e, {root:true})
            throw e
        }
    },
    
}