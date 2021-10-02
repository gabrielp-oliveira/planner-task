export default function FormatDate(date, check){
    const teste = new Date(date)
    const year =  (teste.getFullYear()<10?'0':'') + teste.getFullYear() 
    const month =  (teste.getMonth()<10?'0':'') + teste.getMonth() 
    const day =   (teste.getDate()<10?'0':'') + teste.getDate()
    const hours =   (teste.getHours()<10?'0':'') + teste.getHours()
    const minutes = (teste.getMinutes()<10?'0':'') + teste.getMinutes()
    if(!check){
        return [`${year}-${month}-${day}`, `${hours}:${minutes}`, ]
    }else{
        return `${year}-${month}-${day}`
    }
}