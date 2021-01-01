import React from 'react'
import { Item , Title } from '../Dashboard-style'
import { Amount } from '../../../components'
import { useSelector } from 'react-redux'
import Expenses from './Expenses'
import Budget from './Budget'
import Assets from './Assets'
import Transactions from './Transactions'
import History from './History'

const Balance = () => {
    return (
        <Item>
            <Title>Balance</Title>
            <Amount value={0} />
        </Item>
    )
}

const MonthlyExpenses = () => {
    const {
        user: { transactions}
    } = useSelector(state => state)

    let expense = 0

    if(transactions){
        transactions.forEach(transaction => {
            if(transaction.type === "expense"){
                expense += parseInt(transaction.amount)
            }
        })
    }


    return (
        <Item>
            <Title>Monthly expenses</Title>
            <Amount value={expense} />
        </Item>
    )
}

const MonthlyIncomes = () => {
    const {
        user: { transactions}
    } = useSelector(state => state)

    let income = 0

    if(transactions){
        transactions.forEach(transaction => {
            if(transaction.type === "income"){
                income += parseInt(transaction.amount)
            }
        })
    }

    


    return (
        <Item>
            <Title>Monthly incomes</Title>
            <Amount value={income} />
        </Item>
    )
}

const ComparedToLastMonth = () => {
    return (
        <Item>
            <Title>Compared to last month</Title>
            <Amount value={10}/>
        </Item>
    )
}

export {
    Assets,
    Balance,
    MonthlyExpenses,
    MonthlyIncomes,
    ComparedToLastMonth,
    Budget,
    Expenses,
    Transactions,
    History
}


