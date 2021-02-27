import React from 'react'
import { SectionContainer } from '../../Settings-style'
import Language from './Language'
import Currency from './Currency'
import Theme from './Theme'

const General = () => {
    return (
        <SectionContainer>
            <Language />
            <Currency  />
            <Theme />
        </SectionContainer>
    )
}

export default General
