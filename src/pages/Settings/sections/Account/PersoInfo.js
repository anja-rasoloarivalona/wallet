import React, { useState, useEffect } from 'react'
import { Section, Title } from '../../Settings-style'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input } from '../../../../components/form/unvalidate'
import { Label, Container } from '../../../../components/form/style'

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

    

    const [userName, setUserName] = useState(user.username)


    return (
            <Section>
                <Title margin>Personnal information</Title>
                <Container>
                    <Label shown>{text.username}</Label>
                    <Input 
                        id="username"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        placeholder={text.username}
                    />
                </Container>
                <Container>
                    <Label shown style={{
                        transform: "translateY(-23px) translateX(5px)",
                    }}>
                        {text.email}
                    </Label>
                    <Input 
                        id="useremail"
                        value={user.email}
                        disabled
                    />
                </Container>
                {/* <EmailVerified>
                        <FontAwesomeIcon 
                            icon="check-circle"
                            size="1x"
                        />
                        Email verified
                </EmailVerified> */}
            </Section>
    )
}

export default PersoInfo
