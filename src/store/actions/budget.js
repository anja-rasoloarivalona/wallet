import * as actionTypes from './actionTypes'
import { setDate } from '../../functions'


const setCurrentPeriod = current_period => {
    return {
        type: actionTypes.SET_CURRENT_PERIOD,
        current_period
    }
}

const addBudget = budget => {
    return {
        type: actionTypes.ADD_BUDGET,
        budget
    }
}

const initCurrentPeriod = () => {
    return async function(dispatch, getState){
        const { lang } = getState().settings
        const current_period = setDate(new Date(), "mm-yy", lang)
        dispatch(setCurrentPeriod(current_period))
    }
}

export {
    initCurrentPeriod,
    addBudget
}