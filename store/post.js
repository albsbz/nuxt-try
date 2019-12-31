const posts= [
    {title:'Post1', date:new Date(), views:22, comments: [1, 2], 
_id: 'dsa', text: 'aaa'},
    {title:'Post2', date:new Date(), views:22, comments: [1, 2], 
    _id: 'ds2a', text: 'bbb'},
]
export const actions={
    async fetchAdminPosts({}){
        return await new Promise(resolve=>{
            setTimeout(() => {
                resolve(posts)
            }, 2000);
        })
    },
    async delete({}, id){
       
        return
    },
    async update({}, {text, id}){
        return await new Promise(resolve=>{
            setTimeout(() => {
                resolve(posts.find(p=>p._id===id).text=text)
            }, 2000);
        })
    },
    async create({commit}, {title, text, image}){
        try {
            const fd=new FormData()
            fd.append('title', title)
            fd.append('text', text)
            fd.append('image', image, image.name)
            return await new Promise(resolve=>{
                setTimeout(() => {
                    resolve()
                }, 2000);
            })
        } catch (e){
            commit('setError', e, {root:true})
            throw e
        }
    },
    async fetchAdminById({}, id){
        return await new Promise(resolve=>{
            setTimeout(() => {
                resolve(posts.find(p=>p._id===id))
            }, 2000);
        })
    }
}