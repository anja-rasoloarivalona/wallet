import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utility'

const initialState = {
    lang: "en",
    currency: null,
    dashboard: {},
    theme: "light"
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

const setDashboard = (state, action) => {
    const { size, data } = action.dashboard
    return updatedObject(state, {
        dashboard: {
            ...state.action,
            [size]: data
        }
    })
}

const initDashboard = (state, action) => {
    console.log({
        action
    })
    return updatedObject(state, {
        dashboard: action.dashboard
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_LANG: return setLang(state, action)
        case actionTypes.SET_CURRENCY: return updatedObject(state, {currency: action.currency})
        case actionTypes.SET_THEME: return setTheme(state, action)

        case actionTypes.SET_DASHBOARD: return setDashboard(state, action)
        case actionTypes.INIT_DASHBOARD: return initDashboard(state, action)
        default: return  state
    }
}

export default reducer