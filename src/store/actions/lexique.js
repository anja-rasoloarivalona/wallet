import * as actionTypes from '../actions/actionTypes'


const initText = text => {
    return {
        type: actionTypes.INIT_TEXT,
        text
    }
}

const setText = text => {
    return {
        type: actionTypes.SET_TEXT,
        text
    }
}

const setTextPathName = pathname => {
    return {
        type: actionTypes.SET_TEXT_PATHNAME,
        pathname
    }
}

export {
    initText,
    setText,
    setTextPathName
}