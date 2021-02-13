import { setToken, setUser, clearUser } from './user'
import { setLang, setTheme, setCurrency, setDashboard, updateThemeColors } from './settings'
import { getCategories } from './categories'
import { initText } from './lexique'
import { getInitialText } from '../../translations'
import { client } from '../../functions'


const updateApp = data => {
    return async function(dispatch){

        const { assets, budgets, email, id, setting, username, transactions: _transactions, token, goal } = data

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
            budgets,
            goal
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
        const otherLang = initialLang === "en" ? "fr" : "en"
        const initialTheme = theme ? theme : "light"

        let text = getInitialText(initialLang, [pathname])
        let userOtherLang = false
        const _pathname = window.location.pathname.split("/")[1]
        if(_pathname !== "" && _pathname !== text.currentPage[`link_${_pathname}`]){
            text = getInitialText(otherLang, [pathname])
            userOtherLang = true
        }


        dispatch(initText({
            ...text,
            pathname
        }))
        dispatch(getCategories())
        dispatch(setTheme(initialTheme))
        dispatch(updateThemeColors(initialTheme))
        dispatch(setLang(userOtherLang ? otherLang : initialLang))

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