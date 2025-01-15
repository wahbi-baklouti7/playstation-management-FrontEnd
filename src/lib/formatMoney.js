


export const formatMoney = (amount) => {
   
    const formattedAmount = new Intl.NumberFormat('us-TN', {
        // style: 'currency',
        // currency: 'TND',

        currency: 'USD',
        

        minimumFractionDigits: 3,
        maximumFractionDigits: 3,

        

        


    }).format(amount)
   
    return formattedAmount 

}