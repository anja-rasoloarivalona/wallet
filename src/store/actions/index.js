import {
    initText,
    setText,
    setTextPathName
} from './lexique'

import {
    setLang,
    setCurrency
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
    toggleTransactionForm
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

        if(setting && setting.currency){
            dispatch(setCurrency(JSON.parse(setting.currency)))
        }
    }

}

export {
    initText,
    setText,
    setTextPathName,

    updateApp,

    setLang,
    setCurrency,

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


    toggleTransactionForm

}