import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const Container = styled.div`
    position: fixed;
    left: 25rem;
    top: 0;
    width: calc(100vw - 25rem);
    height: 7rem;

    background: ${props => props.theme.surface};
    border-bottom: 1px solid ${props => props.theme.text};
    z-index: 8;

    background: transparent;
`

const List = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 7rem;
`

const ListItem = styled.div`
    font-size: 1.6rem;
    margin-right: 3rem;
    min-width: 15rem;
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
`

const Label = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    color: ${props => props.active ? props.theme.active_text : props.theme.text};
    cursor: pointer;
    :hover {
        color: ${props => props.theme.active_text}
    }
`

const SettingsHeader = props => {
    const { section, setSection } = props
    const {
        text : { currentPage: text}
    } = useSelector(state => state)

    const links = [
        { label: text.general, section: "general"},
        { label: text.categories, section: "categories"},
        {label: text.account, section: "account"}
    ]

    const renderSectionLink = link => {
        return (
            <ListItem
                key={link.section}
                onClick={() => setSection(link.section)}
            >
                <Label active={section === link.section}>{link.label}</Label>      
            </ListItem>
        )
    }

    return (
        <Container>
            <List>
                {links.map(renderSectionLink)}
            </List>
        </Container>
    )
}

export default SettingsHeader
