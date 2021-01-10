import { setToken, setUser, clearUser } from './user'
import { setLang, setTheme, setCurrency, setDashboard, updateThemeColors } from './settings'
import { getCategories } from './categories'
import { initText, setTextPathName } from './lexique'
import { getInitialText } from '../../translations'
import { client } from '../../functions'


const updateApp = data => {
    return async function(dispatch){

        const { assets, budgets, email, id, setting, username, transactions: _transactions, token } = data

        if(setting){
            if(setting.currency){
                dispatch(setCurrency(JSON.parse(setting.currency)))
            }
            if(setting.dashboard){
                dispatch(setDashboard(setting.dashboard))
            }
            if(setting.theme){
                dispatch(setTheme(setting.theme))
            }
        }

        const transactions = _transactions.sort((prev, next) => new Date(next.date) - new Date(prev.date))
        
        dispatch(setUser({
            id,
            username,
            email,
            assets,
            transactions,
            budgets
        })) 

        if(token){
            dispatch(setToken(token))
        }
    }
}

const initApp = () => {
    return async function(dispatch){
        const pathname = window.location.pathname
        const lang = localStorage.getItem("moneytor-lang")
        const token = localStorage.getItem("moneytor-token")
        const theme = localStorage.getItem("moneytor-theme")
        const initialLang = lang ? lang : "en"
        const text = getInitialText(initialLang, [pathname])
        const initialTheme = theme ? theme : "light"

        dispatch(setTextPathName(pathname))
        dispatch(initText(text))
        dispatch(getCategories())
        dispatch(setTheme(initialTheme))
        dispatch(updateThemeColors(initialTheme))
        dispatch(setLang(initialLang))

        if(token){
            try {
                const res = await client.post("/verify-user-token", { token: token })
                const resData = res.data.data

                dispatch(updateApp({
                    ...resData,
                    token
                }))
            } catch(err){
                console.log(err.message)
                dispatch(clearUser())
            }
        } else {
            dispatch(clearUser())
        }
    }
}

const updateTheme = theme => {
    return async function(dispatch){
        dispatch(setTheme(theme))
        dispatch(updateThemeColors(theme))
    }
}


export {
    initApp,
    updateApp,
    updateTheme
}