import React from 'react'
import { Item , Title } from '../Dashboard-style'
import { Amount } from '../../../components'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { setDate } from '../../../functions'


const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 0;
    background: none;
`

const Table = styled.div`
    margin-top: 2rem;
`

const Transaction = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 1rem;
    ${props => {
        if(props.background){
            return {
                background: props.theme.surface_secondary
            }
        }
    }}
`

const LabelContainer = styled.div`
    display: flex;
    align-items: center;
`
const Label = styled.div``
const LabelText = styled.div`
    font-size: 1.4rem;
    line-height: 1.4;
`
const LabelDate = styled.div`
    font-size: 1.2rem;
    color: ${props => props.theme.text};
`

const IconContainer = styled.div`
    width: 3rem;
    height: 3rem;
    background: ${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1.5rem;
    border-radius: 50%;
`
const Icon = styled(FontAwesomeIcon)``

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    font-size: 1.4rem;
`

const Transactions = () => {
    const {
        text: { currentPage: text },
        categories,
        settings: { lang },
        user: { transactions }
    } = useSelector(state => state)


    const renderTransactionItem = (transaction, index) => {
        const { id, category : { sub_icon, sub_name, master_name }, type, date, amount } = transaction
        const color = type === "income" ? categories.income.color : categories.expense[master_name].color
        const background = Math.abs(index % 2) === 1;
        

        return (
            <Transaction key={id} background={background}>
                <LabelContainer>
                    <IconContainer color={color}>
                        <Icon 
                            icon={sub_icon}
                            size="1x"
                            color="white"
                        />
                    </IconContainer>
                    <Label>
                        <LabelText>{text[sub_name] }</LabelText>
                        <LabelDate>{setDate(date, "dd mm", lang, "short")}</LabelDate>
                    </Label>
                </LabelContainer>
                <AmountContainer>
                    <Amount value={amount}/>
                </AmountContainer>
            </Transaction>
        )
    }
  
    return (
        <Item >
            <Title>Recent Transactions</Title>
            <Table>
                {transactions && transactions.map((transaction, index) => renderTransactionItem(transaction, index))}
            </Table>

        </Item>
    )
}

export default Transactions