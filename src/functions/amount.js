const renderAmount = (amount, lang, currency) => {
    if(lang === "fr"){
        return `${parseInt(amount.toFixed(2))} ${currency}`
    } else {
        return `${currency} ${parseInt(amount.toFixed(2))}`
    }
}

export {
    renderAmount
}