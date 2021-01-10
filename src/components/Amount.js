import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const Container = styled.div`
    ${props => {
        if(props.income){
            return {
                color: props.theme.income.color
            }
        }
    }}
`

const Amount = props => {
    const { value } = props
    const { 
        settings : {
            lang, 
            currency 
        },
    } = useSelector(state => state)
    const amount = parseInt(value)


    const numberWithSpaces = (x) => {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(".");
    }

    if(!currency){
        return <div></div>
    }

    if(lang === "fr"){
        return <Container {...props}>
                    {numberWithSpaces(amount.toFixed(2))} {currency.symbol}
                </Container>
    } else {
        return  <Container {...props}>
                    {currency.symbol} {numberWithSpaces(amount.toFixed(2))}
                </Container>  
    }
}

export {
    Amount
}
