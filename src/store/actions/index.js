import {
    initText,
    setText,
    setTextPathName
} from './lexique'

import {
    initLang,
    setLang,
    setCurrency,
    setDashboard
} from './settings'

import {
    setError,
    clearError
} from './error'

import {
     getCategories
} from './categories'

import {
    initCurrentPeriod,
    addBudget,
    setBudget
} from './budget'

import {
    setUser,
    clearUser,
    setAssets,
    setToken
} from './user'

import {
    toggleTransactionForm,
    toggleSideBar,
    toggleDashboard
} from './interface'

const updateApp = data => {
    return async function(dispatch){
        const { assets, budgets, email, id, setting, username, transactions, token } = data
        if(token){
            dispatch(setToken(token))
        }
        dispatch(setUser({
            id,
            username,
            email,
            assets,
            transactions
        })) 
        dispatch(setBudget(budgets))
        if(setting){
            if(setting.currency){
                dispatch(setCurrency(JSON.parse(setting.currency)))
            }
            if(setting.dashboard){
                dispatch(setDashboard(setting.dashboard))
            }
        }
        
    }

}

export {
    initText,
    setText,
    setTextPathName,

    updateApp,

    initLang,
    setLang,
    setCurrency,
    setDashboard,

    setError,
    clearError,

    getCategories,

    initCurrentPeriod,
    addBudget,
    setBudget,

    setUser,
    clearUser,
    setAssets,
    setToken,


    toggleTransactionForm,
    toggleSideBar,
    toggleDashboard

}