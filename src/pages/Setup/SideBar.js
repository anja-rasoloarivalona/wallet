import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled.div`
    position: fixed;
    z-index: 5;
    top: 0rem;
    left: 0;
    width: 30rem;
    height: 100vh;
    border-right: 1px solid  ${props => props.theme.text};
    background: white;
`

const List = styled.ul`
    width: 100%;
`

const ListItem = styled.li`
    padding: 1rem 0;
    padding-left: 4rem;
    margin-bottom: 1rem;
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    color: ${props => props.theme.active_text};

    ${props => {
        if(props.isValid){
            return {
                color: props.theme.green
            }
        }
    }}
    
    ${props => {
        if(props.active){
            return {
                background: props.theme.clr_primary,
                color: "white"
            }
        }
    }}


`
const ListItemCheck = styled.div`
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 1px solid;
    border-color: ${props => props.isValid ? "inherit" : "transparent"};
    margin-right: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        color: ${props => props.isValid || props.active ? "inherit" : "transparent"};
    }
`

const ListItemText = styled.div``

const Title = styled.div`
    height: 7.5rem;
    display: flex;
    align-items: center;
    padding-left: 4rem;
    font-size: 3rem;
    color: ${props => props.theme.clr_primary};
`

 const SideBar = props => {

    const { sections, currentSection } = props

     const renderItem = (item, index)=> {
         const active = currentSection === index
        const { name, isValid } = item
         return (
             <ListItem key={index} active={active} isValid={isValid}>
                 <ListItemCheck isValid={isValid} active={active}>
                     <FontAwesomeIcon 
                        icon={active ? "arrow-right" : "check"}
                        size="1x"
                     />
                 </ListItemCheck>
                 <ListItemText>{name}</ListItemText>
             </ListItem>
         )
     }
    return (
        <Container>
            <Title>Setup</Title>
            <List>
                {sections.map((item, index) => renderItem(item, index))}
            </List>
        </Container>
    )
}

export default SideBar