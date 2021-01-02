import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const Container = styled.div``

const Amount = props => {
    const { value } = props
    const { lang, currency } = useSelector(state => state.settings)
    const amount = parseInt(value)

    if(!currency){
        return <div></div>
    }

    if(lang === "fr"){
        return <Container>{amount.toFixed(2)} {currency.symbol}</Container>
    } else {
        return  <Container>{currency.symbol} {amount.toFixed(2)}</Container>  
    }



}

export {
    Amount
}
