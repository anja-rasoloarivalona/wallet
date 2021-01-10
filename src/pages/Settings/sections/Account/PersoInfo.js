import React, { useState } from 'react'
import { Section, Title, TextContainer, Text} from '../../Settings-style'
import { useSelector } from 'react-redux'
import { AppInput, Label } from '../../../../functions/form-style'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SectionItem = styled.div`
    position: relative;
    margin-top: 5rem;
`

const EmailVerified = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
     margin: auto;
    right: 2rem;
    height: 100%;
    display: flex;
    align-items: center;
    color: ${props => props.theme.green};

    svg {
        color: ${props => props.theme.green};
        margin-right: 1rem;
    }
`

const PersoInfo = () => {
    const { 
        user,
        text: { currentPage: text }
    } = useSelector(state => state)

    const [ userData, setUserData ] = useState(user)

    return (
            <Section>
                <Title>Personnal information</Title>
                <SectionItem>
                    <AppInput 
                        value={userData.username}
                        onChange={e => setUserData( prev => ({ ...prev, username: e.target.value}))}
                        placeholder={text.username}
                        id="username"
                    />
                    <Label htmlFor="username" shown>{text.username}</Label>
                </SectionItem>
                <SectionItem>
                    <AppInput 
                        value={userData.email}
                        id="username"
                        disabled
                    />
                    <EmailVerified>
                        <FontAwesomeIcon 
                            icon="check-circle"
                            size="1x"
                        />
                        Email verified
                    </EmailVerified>
                    <Label htmlFor="username" shown>{text.email}</Label>
                </SectionItem>
            </Section>
    )
}

export default PersoInfo
