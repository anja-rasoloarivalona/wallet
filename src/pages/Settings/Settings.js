import React, { useState } from 'react'
import styled from 'styled-components'
import SettingsHeader from './SettingsHeader'
import { General, Categories, Account } from './sections'

const Container = styled.div`
    grid-column: 1 / -1;
    width: 100%;
    min-height: 100vh;
    background: ${props => props.theme.background};
    display: flex;
    padding-left: 7rem;
    padding-top: 7rem;
    display: flex;
    flex-direction: column;
    color: ${props => props.theme.text}
`

const Title = styled.div`
    padding: 3rem 0;
    font-size: 3rem;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
`



const Settings = () => {

    const [section, setSection] = useState("account")

    const sections = {
        general: General,
        categories: Categories,
        account: Account
    }

    const CurrentSection = sections[section]

    return (
        <Container>
            <SettingsHeader
                section={section}
                setSection={setSection}
            />
            <Content>
                <CurrentSection />
            </Content>   
        </Container>
    )
}


export default Settings
