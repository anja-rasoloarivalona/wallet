import React from 'react'
import { ItemContainer , Title, Amount} from '../Dashboard-style'
import { renderAmount } from '../../../functions'
import { useSelector } from 'react-redux'

const MonthlyReport = () => {
    const { lang } = useSelector(state => state.settings)
    return (
        <ItemContainer>
            <Title>Monthly Report</Title>
            <Amount>{renderAmount(35, lang, "$")}</Amount>
        </ItemContainer>
    )
}

export default MonthlyReport