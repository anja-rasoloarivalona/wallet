import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Amount } from '../../components'

const Container = styled.div`
    width: ${props => props.full ?  "calc(100vw - 25rem)" : "calc(100vw - 7rem)"};
    height: 9rem;
    background: ${props => props.theme.background};
    
    padding-left: 4rem;
    padding-right: 3rem;

    transition: all .3s ease-in;

    display: flex;
    align-items: center;
    justify-content: space-between;


    @media (max-width: 767px){
        padding-left: 2rem;
        width: 100vw;
    }
`

const BalanceContainer = styled.div`
     & > div:last-child {
        font-size: 2.5rem;
        color: ${props => props.theme.text};
     }
`

const BalanceText = styled.div`
    font-size: 1.6rem;
    margin-bottom: .8rem;
    font-weight: 600;
    color: ${props => props.theme.text_light};

`

const DashboardHeader = ()  => {
    const {
        ui : { sidebar },
        user: { assets },
    } = useSelector(state => state)

    const [balance, setBalance] = useState(0)

    useEffect(() => {
        if(assets){
            let currentBalance = 0
            assets.forEach(asset => {
                currentBalance += parseInt(asset.amount)
            })
            setBalance(currentBalance)
        }
    },[assets])


    return (
        <Container full={sidebar.isShown}>
            <BalanceContainer>
                <BalanceText>Balance</BalanceText>
                <Amount value={balance}/>
            </BalanceContainer>
        </Container>
    )
}

export default DashboardHeader
