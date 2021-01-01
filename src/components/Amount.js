import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const Container = styled.div``

const Amount = props => {
    const { value } = props
    const { lang, currency } = useSelector(state => state.settings)

    if(!currency){
        return <div></div>
    }

    if(lang === "fr"){
        return <Container>{value.toFixed(2)} {currency.symbol}</Container>
    } else {
        return  <Container>{currency.symbol} {value.toFixed(2)}</Container>  
    }



}

export {
    Amount
}
