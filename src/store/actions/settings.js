import * as actionTypes from './actionTypes'

const setLang = lang => {
    return {
        type: actionTypes.SET_LANG,
        lang,
    }
}

const setTheme = theme => {
     return {
        type: actionTypes.SET_THEME,
        theme
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

const updateThemeColors = theme => {
    return {
        type: actionTypes.UPDATE_THEME_COLORS,
        theme
    }
}

export {
    setLang,
    setTheme,
    setCurrency,
    setDashboard,
    updateThemeColors
}