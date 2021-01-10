import React, { useState } from 'react'
import { SectionContainer } from '../../Settings-style'
import { Section, Title, TextContainer, Text} from '../../Settings-style'
import { useSelector } from 'react-redux'
import PersoInfo from './PersoInfo'
import Password from './Password'


const Account = () => {
    const { 
        user,
        text: { currentPage: text }
    } = useSelector(state => state)

    const [ userData, setUserData ] = useState(user)

    return (
        <SectionContainer>
            <PersoInfo />
            <Password />
        </SectionContainer>
    )
}

export default Account
