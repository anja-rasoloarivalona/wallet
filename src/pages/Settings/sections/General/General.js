import React from 'react'
import { SectionContainer } from '../../Settings-style'
import Language from './Language'
import Currency from './Currency'
import Theme from './Theme'
import { useDispatch } from 'react-redux'
import * as actions from '../../../../store/actions'
import { client } from '../../../../functions'


const General = () => {
    const dispatch = useDispatch()
    
    const changeCurrency = async currency => {
        dispatch(actions.setCurrency(currency))
        try {
            await client.post("/settings/currency", {currency})
        } catch(err){
            console.log(err)
        }
    }


    return (
        <SectionContainer>
            <Language />
            <Currency changeCurrency={changeCurrency} />
            <Theme />
        </SectionContainer>
    )
}

export default General
