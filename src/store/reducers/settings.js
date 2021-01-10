import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utility'

const initialState = {
    lang: "en",
    currency: null,
    dashboard: null,
    theme: "light"
}

const setDashboard = (state, action) => {
    const dashboard = JSON.parse(action.dashboard)
    return updatedObject(state, {
        dashboard
    })

}

const setLang = (state, action ) => {
    const { lang } = action
    localStorage.setItem("moneytor-lang", lang)
    return updatedObject(state, { lang })
}

const setTheme = (state, action) => {
    const { theme } = action
    localStorage.setItem("moneytor-theme", theme)
    return updatedObject(state, { theme })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_LANG: return setLang(state, action)
        case actionTypes.SET_CURRENCY: return updatedObject(state, {currency: action.currency})
        case actionTypes.SET_DASHBOARD: return setDashboard(state, action)
        case actionTypes.SET_THEME: return setTheme(state, action)
        default: return  state
    }
}

export default reducer