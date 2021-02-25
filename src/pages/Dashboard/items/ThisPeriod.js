import React from 'react'
import {Item as DashboardItem, Title } from '../Dashboard-style'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { setDate } from '../../../functions'
import { Amount } from '../../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled(DashboardItem)`
    display: flex;
    flex-direction: column;
`

const Content = styled.div`
    flex: 1;
    display: flex;
    padding-top: 1rem;

    > div:first-child {
        // background: salmon;
        margin-right: 3rem;
    }

    > div:last-child {
        background: ${props => props.theme.background};
    }
`

const Item = styled.div`
    width: 100%;
    font-size: 1.4rem;
    padding: 1rem;
    border-radius: 1rem;
    border: 1px solid ${props => props.theme.text_light};

    .amount {
        font-size: 2rem;
        margin-top: 1rem;
    }
`

const ItemTitle = styled.div`
    display: flex;
    align-items: center;
`

const IconContainer = styled.div`
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    background: ${props => props.income ? props.theme.income.color : "red"};
    margin-right: 1rem;

    svg {
        color: ${props => props.theme.surface};
    }
`


const ThisPeriod = () => {

    const {
        settings: { lang },
        text: { currentPage: text},
        user: { transactions : data,  current_period}
    } = useSelector(state => state)

    const periodTitle = setDate(new Date(), "mm yyyy", lang, "long")
    const transactions = data.filter(transaction => transaction.period === current_period)

    let income = 0
    let expense = 0

    transactions.forEach(transaction => {
        if(transaction.type === "income"){
            income += parseFloat(transaction.amount) 
        } else {
            expense += parseFloat(transaction.amount)
        }
    })


    return (
        <Container>
            <Title>{periodTitle}</Title>
            <Content>
                <Item>
                    <ItemTitle>
                        <IconContainer income>
                            <FontAwesomeIcon 
                                icon="wallet"
                            />
                        </IconContainer>

                        {text.income}
                    </ItemTitle>
                    <Amount value={income} className="amount"/>
                </Item>
                <Item>
                    <ItemTitle>
                        <IconContainer>
                            <FontAwesomeIcon 
                                icon="wallet"
                            />
                        </IconContainer>
                        {text.expense}
                    </ItemTitle>
                    <Amount value={expense} className="amount"/>
                </Item>
            </Content>
        </Container>
    )
}

export default ThisPeriod
