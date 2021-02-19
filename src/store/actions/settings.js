import * as actionTypes from './actionTypes'
import { client } from '../../functions'
import _ from 'lodash'


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
    console.log({
        currency
    })
    return {
        type: actionTypes.SET_CURRENCY,
        currency
    }
}

const getDashboard = () => {
    console.log("getting dashboard")
    return async function ( dispatch ){
        try {
            const res = await client.get("/dashboard")
            console.log({
                res
            })
            const resData = res.data.data
            const dashboard = {}
            if(!_.isEmpty(resData)){
                resData.forEach(layout => {
                    dashboard[layout.size] = JSON.parse(layout.data)
                })
            }
            dispatch(initDashboard(dashboard))
        } catch(err){
            console.log({
                err
            })
        }
    }
}

const initDashboard = dashboard => {
    return {
        type: actionTypes.INIT_DASHBOARD,
        dashboard
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
    updateThemeColors,
    getDashboard
}