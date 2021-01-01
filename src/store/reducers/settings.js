import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utility'

const initialState = {
    lang: "en",
    currency: null,
    dashboard: null
}

const setDashboard = (state, action) => {
    const dashboard = JSON.parse(action.dashboard)
    return updatedObject(state, {
        dashboard
    })

}

const initLang = state => {
    const lang = localStorage.getItem("moneytor-lang")
    const initialLang = lang ? lang : "en"
    return updatedObject(state, { lang: initialLang })
}

const setLang = (state, action ) => {
    const { lang } = action
    localStorage.setItem("moneytor-lang", lang)
    return updatedObject(state, { lang })
}


const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.INIT_LANG: return initLang(state)
        case actionTypes.SET_LANG: return setLang(state, action)
        case actionTypes.SET_CURRENCY: return updatedObject(state, {currency: action.currency})
        case actionTypes.SET_DASHBOARD: return setDashboard(state, action)
        default: return  state
    }
}

export default reducer