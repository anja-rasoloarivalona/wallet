import React from 'react'
import styled from 'styled-components'
import { Amount } from '../components'

const CardContainer = styled.div`
    width: 30rem;
    height: 13rem;
    background: green;
    border-radius: 1rem;
    padding: 1.5rem;
    background: #46474D;
    background: -webkit-linear-gradient(top left, #46474D, #595A5D);
    background: -moz-linear-gradient(top left, #46474D, #595A5D);
    background: linear-gradient(to bottom right, #46474D, #595A5D);
`

const CardAmount = styled.div`
    font-size: 2rem;
    font-weight: 600;
    color: ${props => props.theme.text}
`

const Card = props => {
    const { card } = props
    return (
        <CardContainer>
            <CardAmount>
                <Amount value={card.amount}/>
            </CardAmount>
        </CardContainer>
    )
}

export {
    Card
}