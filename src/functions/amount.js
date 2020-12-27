const renderAmount = (amount, lang, currency) => {
    if(lang === "fr"){
        return `${amount.toFixed(2)} ${currency}`
    } else {
        return `${currency} ${amount.toFixed(2)}`
    }
}

export {
    renderAmount
}