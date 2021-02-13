import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import SettingsHeader from './SettingsHeader'
import { General, Categories, Account } from './sections'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Container = styled.div`
    grid-column: 1 / -1;
    width: 100%;
    min-height: 100vh;
    background: ${props => props.theme.surface};
    display: flex;
    padding-left: 7rem;
    // padding-top: 7rem;
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



const Settings = props => {

    const {
        text: { currentPage: text},
    } = useSelector(state => state)

    const [section, setSection] = useState(text.link_general)




    const location = useLocation()

    const sections = {
        [text.link_general]: General,
        // [text.categories]: Categories,
        [text["link_my-account"]]: Account
    }

    useEffect(() => {

        


        if(location.hash === ""){
            props.history.push(`#${text.link_general}`)
        } else {
            const nextSection = location.hash.substr(1)
            const nextSectionTranslation = `${text[`link_${nextSection}`]}`
            if(section !== nextSectionTranslation){
                setSection(nextSectionTranslation)   
                props.history.push(`#${nextSectionTranslation}`)
            }

        
        }
    },[location])





    const CurrentSection = sections[section]

    return (
        <Container>
            {/* <SettingsHeader
                section={section}
                setSection={setSection}
            /> */}
            <Content>
                <CurrentSection />
            </Content>   
        </Container>
    )
}


export default Settings
