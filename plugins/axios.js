export default function ({$axios, redirect, store}){
    
    $axios.interceptors.request.use(req=>{
        if(store.getters['auth/isAuth']&& !req.headers.common['Authorization']){
            const token=store.getters['auth/token']
            req.headers.common['Authorization']=`Bearer ${token}`
        }
        return req
    })
    $axios.interceptors.response.use(res=>{
        return res
    })
    
    $axios.onError((error)=>{
        if(error.response){
            if (error.response.status === 401){
                redirect('/admin/login?message=session')
                StorageEvent.dispatch('auth/logout')
            }
            if (error.response.status === 500){
                console.error('Server 500 error')
            }
        }
    })
}