import React from 'react'
import { ItemContainer , Title, Amount} from '../Dashboard-style'
import { renderAmount } from '../../../functions'
import { useSelector } from 'react-redux'

const Balance = () => {
    const { lang } = useSelector(state => state.settings)
    return (
        <ItemContainer>
            <Title>Balance</Title>
            <Amount>{renderAmount(35, lang, "$")}</Amount>
        </ItemContainer>
    )
}

export default Balance
