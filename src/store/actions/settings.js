import * as actionTypes from './actionTypes'


const initLang = () => {
    return  {
        type: actionTypes.INIT_LANG
    }
}

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

const setDashboard = dashboard => {
    return {
        type: actionTypes.SET_DASHBOARD,
        dashboard
    }
}

export {
    initLang,
    setLang,
    setCurrency,
    setDashboard
}