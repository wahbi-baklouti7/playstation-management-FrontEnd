




export const formateDateAndTime = (date) => {

    const d = new Date(date)
    const year = d.getFullYear()
    const month = padDate(d.getMonth() + 1)
    const day = padDate(d.getDate())
    const hours = padDate(d.getHours())
    const minutes = padDate(d.getMinutes())
    const seconds = padDate(d.getSeconds())
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// const formateTime = (date) => {
//     const d = new Date(date)
//     const hours = d.getHours()
//     const minutes = d.getMinutes()
//     const seconds = d.getSeconds()
//     return `${hours}:${minutes}:${seconds}`
// }

export const formatDate = (date) => {

    const d = new Date(date)
    const year = d.getFullYear()
    const month = padDate(d.getMonth() + 1)
    const day = padDate(d.getDate())
    return `${year}-${month}-${day}`
} 

export const formateDayAndMonth = (date) => {

    const d = new Date(date)
    const month = padDate(d.getMonth() + 1)
    const day = padDate(d.getDate())
    return `${day}-${month}`
}

const padDate = (date) => {
    return date.toString().padStart(2, '0')

}
