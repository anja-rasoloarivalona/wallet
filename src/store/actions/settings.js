import * as actionTypes from './actionTypes'

const setLang = lang => {
    return {
        type: actionTypes.SET_LANG,
        lang,
    }
}

const setCurrency = currency => {
    return {
        type: actionTypes.SET_CURRENCY,
        currency
    }
}

export {
    setLang,
    setCurrency
}