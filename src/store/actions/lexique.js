import * as actionTypes from '../actions/actionTypes'


const initText = text => {
    return {
        type: actionTypes.INIT_TEXT,
        text
    }
}

export {
    initText
}