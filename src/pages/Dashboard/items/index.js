import React from 'react'
import { Item , Title, Amount} from '../Dashboard-style'
import { renderAmount } from '../../../functions'
import { useSelector } from 'react-redux'
import Expenses from './Expenses'
import Budget from './Budget'
import Assets from './Assets'
import Transactions from './Transactions'
import History from './History'

const Balance = () => {
    const { lang } = useSelector(state => state.settings)
    return (
        <Item>
            <Title>Balance</Title>
            <Amount>{renderAmount(35, lang, "$")}</Amount>
        </Item>
    )
}

const MonthlyExpenses = () => {
    const { lang } = useSelector(state => state.settings)
    return (
        <Item>
            <Title>Monthly expenses</Title>
            <Amount>{renderAmount(35, lang, "$")}</Amount>
        </Item>
    )
}

const MonthlyIncomes = () => {
    const { lang } = useSelector(state => state.settings)
    return (
        <Item>
            <Title>Monthly incomes</Title>
            <Amount>{renderAmount(35, lang, "$")}</Amount>
        </Item>
    )
}

const ComparedToLastMonth = () => {
    const { lang } = useSelector(state => state.settings)
    return (
        <Item>
            <Title>Compared to last month</Title>
            <Amount>{renderAmount(35, lang, "$")}</Amount>
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


