import * as actionTypes from './actionTypes'
import { client } from '../../functions'


const setCategories = categories => {
    return {
        type: actionTypes.SET_CATEGORIES,
        categories
    }
}

const getCategories = () => {
    return async function(dispatch, getState){
        const { currentPage : text } = getState().text
        try {
            const res = await client.get("/categories")
            const { data } = res.data
            const categories = {
                income: {},
                expense: {}
            }
            data.forEach( (ctg, ctgIndex) => {
                if(!categories[ctg.type][ctg.master_name]){
                    categories[ctg.type][ctg.master_name] = {
                        master_id: data[ctgIndex].master_id,
                        master_name: text[data[ctgIndex].master_name],
                        master_icon: data[ctgIndex].master_icon,
                        color: data[ctgIndex].color,
                        type: data[ctgIndex].type,
                        children: {
                            [data[ctgIndex].sub_name]: {
                                sub_id: data[ctgIndex].sub_id,
                                sub_name: text[data[ctgIndex].sub_name],
                                sub_icon: data[ctgIndex].sub_icon
                            }
                        }
                    }
                } else {
                    categories[ctg.type][ctg.master_name].children[data[ctgIndex].sub_name] = {
                        sub_id: data[ctgIndex].sub_id,
                        sub_name: text[data[ctgIndex].sub_name],
                        sub_icon: data[ctgIndex].sub_icon
                    }
                }
            })
            categories.income = categories.income.income
            dispatch(setCategories(categories))
        } catch(err){
            console.log(err)
        }
    }
}

export {
    getCategories
}