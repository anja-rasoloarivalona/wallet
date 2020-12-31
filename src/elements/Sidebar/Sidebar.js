import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'

const Container = styled.div`
    position: fixed;
    z-index: 11;
    top: 7.5rem;
    left: 0;
    width: 35rem;
    height: calc(100vh - 7.5rem);
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    padding-right: 1rem;
    background: ${props => props.theme.background};
`

const Content = styled.div`
    width: 100%;
    height: 100%;
    background: blue;
    border-radius: 2.5rem;
    background: ${props => props.theme.surface};
    padding-top: 2rem;
    color: ${props => props.theme.text};
    margin-top: 2.7rem;
    box-shadow: 0px 1px 2px -1px rgb(113 113 113 / 75%);
`

const List = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const ListItem = styled.li`
    padding: 2rem 3.4rem;
    font-size: 1.8rem;
    display: flex;
    align-items: center;

    svg {
        margin-right: 1.5rem
    }
`

const ListLink = styled(NavLink)`
    &, &:visited {
        text-decoration: none;
        color: ${props => props.theme.text};
        position: relative;
    }
    &.active, &:hover {
        color: ${props => props.theme.active_text};
    }

    &.active:after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        width: .5rem;
        height: 80%;
        background:  ${props => props.theme.active_text};
    }
`

const ListItemText = styled.div``

const AddTransaction = styled.div`
    position: absolute;
    bottom: 8rem;
    left: 0;
    right: 0;
    margin: auto;
    cursor: pointer;
    width: 9rem;
    height: 9rem;
    border-radius: 50%;
    background: grey;

    display: flex;
    align-items: center;
    justify-content: center;
`

 const SideBar = props => {
    const dispatch = useDispatch()
    const {
        text
    } = useSelector(state => state)

    return (
        <Container>
            <Content>
                <List>
                    <ListLink to="/" exact>
                        <ListItem>
                            <FontAwesomeIcon 
                                icon="project-diagram"
                                size="1x"
                            />
                            <ListItemText>
                                Dasboard
                            </ListItemText>

                        </ListItem>
                    </ListLink>
                    <ListLink to="/transactions">
                        <ListItem>
                            <FontAwesomeIcon 
                                icon="chart-line"
                                size="1x"
                            />
                            <ListItemText>
                                Transactions
                            </ListItemText>
                        </ListItem>
                    </ListLink>
                    <ListLink to="/settings">
                        <ListItem>
                            <FontAwesomeIcon 
                                icon="cogs"
                                size="1x"
                            />
                            <ListItemText>
                                Settings
                            </ListItemText>
                        </ListItem>
                    </ListLink>
                </List>

                <AddTransaction onClick={() => dispatch(actions.toggleTransactionForm({ action: "add" }))}>
                    <FontAwesomeIcon 
                        icon="plus"
                        size="3x"
                        color="white"
                    />
                </AddTransaction>
            </Content>
        </Container>
    )
}

export default SideBar