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
        user: { transactions, current_period},
        text: { currentPage : text},
    } = useSelector(state => state)

    let expense = 0

    if(transactions){
        transactions.forEach(transaction => {
            if(transaction.type === "expense" && transaction.period === current_period){
                expense += parseInt(transaction.amount)
            }
        })
    }

    return (
        <Item>
            <Title>{text.monthly_expenses}</Title>
            <Amount
                value={expense}
                className="dashboard_amount"
            />
        </Item>
    )
}

const MonthlyIncomes = () => {
    const {
        user: { transactions, current_period },
        text: { currentPage : text},
    } = useSelector(state => state)

    let income = 0

    if(transactions){
        transactions.forEach(transaction => {
            if(transaction.type === "income" && transaction.period === current_period){
                income += parseInt(transaction.amount)
            }
        })
    }

    return (
        <Item>
            <Title>{text.monthly_incomes}</Title>
            <Amount
                value={income}
                income
                className="dashboard_amount"
            />
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


