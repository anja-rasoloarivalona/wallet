import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled.div`
    position: fixed;
    z-index: 5;
    top: 7.5rem;
    left: 0;
    width: 30rem;
    height: calc(100vh - 7.5rem);
    border-right: 1px solid  ${props => props.theme.clr_text_semi_dark};
    padding-top: 7.5rem;
    background: white;
`

const List = styled.ul`
    width: 100%;
    > li:first-child {
        border-top: 1px solid grey;
    }
`

const ListItem = styled.li`
    padding: 2rem 3rem;
    margin-bottom: 1rem;
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid grey;
`
const ListItemCheck = styled.div`
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 1px solid;
    border-color: grey;
    margin-right: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
`

const ListItemText = styled.div``



 const SideBar = props => {


     const renderItem = item => {
         return (
             <ListItem key={item.name}>

             </ListItem>
         )
     }
    return (
        <Container>

        </Container>
    )
}

export default SideBar