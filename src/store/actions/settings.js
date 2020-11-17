import * as actionTypes from './actionTypes'

const setLang = lang => {
    return {
        type: actionTypes.SET_LANG,
        lang,
    }
}

export {
    setLang
}