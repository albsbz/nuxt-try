export default (date, type)=>{
    const result=new Date(date)
    if(type==='date') {
        return result.toLocaleDateString()
    } else if(type==='time') {
        return result.toLocaleTimeString()
    } else  {
        return result.toLocaleString()
    }

}