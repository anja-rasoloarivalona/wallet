import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'

const Container = styled.div`
    position: fixed;
    z-index: ${props => props.openedForm ? 1 : 12};
    left: 0;
    width: ${props => props.fullWidth ? "25rem" : "7rem"};
    height: 100vh;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.background};
    transition:  ${props => props.openedForm ? "all 0s ease-in" : "all .3s ease-in"};
`

const Content = styled.div`
    width: 100%;
    height: 100%;
    background: ${props => props.theme.surface};
    color: ${props => props.theme.text};
    box-shadow: 0px 1px 2px -1px rgb(113 113 113 / 75%);
`

const IconContainer = styled.div`
    width: 7rem;
    min-width: 7rem;
    max-width: 7rem;
    height: 7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    z-index: 10;
    background:  ${props => props.theme.surface};

    ${props => {
        if(!props.header){
            return {
                height: "6rem"
            }
        }
    }}
`

const Top = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.6rem;

    svg {
        color: ${props => props.theme.active_text}
    }
`

const TopText = styled.div``

const List = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
    list-style: none;
`

const ListItem = styled.li`
    font-size: 1.6rem;
    display: flex;
    align-items: center;

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
        height: 70%;
        background:  ${props => props.theme.active_text};
    }
`

const ListItemText = styled.div`
    opacity: 0;
    position: relative;
    z-index: 2;

    ${props => {
        if(props.shown){
            return {
                opacity: 1
            }
        }
    }}
`

const Logout = styled.div`
    position: absolute;
    bottom: 8rem;
    left: 0;
    right: 0;
    margin: auto;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 1.8rem;
    padding-left: ${props => props.shown ? "3rem" : "0"};
    transition: all .3s ease-in;
`



 const SideBar = props => {
    const dispatch = useDispatch()
    const {
        text : { currentPage : text },
        ui: { sidebar, openedForm },
        user
    } = useSelector(state => state)

    const [showText, setShowText ] = useState(sidebar.isShown)

    
    const salutationText = () => {
        const [ time, period ] = new Date().toLocaleTimeString("en").split(" ")
        const hour = parseInt(time.split(":")[0]) 


        if(period === "AM"){
            return text.morning_salutation
        }
        if(hour >= 6){
            return text.evening_salutation
        }
        return text.noon_salutation
        
    }

    const links = [
        { link: `/${text.link_dashboard}`, icon: "project-diagram", label: text.dashboard},
        { link: `/${text.link_transactions}`, icon: "chart-line", label: text.transactions, exact: false},
        { link: `/${text.link_profile}`, icon: "user", label: text.profile, exact: false },
        { link: `/${text.link_settings}`, icon: "cogs", label: text.settings, exact: false}
    ]

    const renderLink = item => {
        return (
            <ListLink key={item.link} to={item.link} exact={item.exact}>
                <ListItem>
                    <IconContainer>
                        <FontAwesomeIcon 
                            icon={item.icon}
                            size="1x"
                        />
                    </IconContainer>
                    <ListItemText shown={showText}>{item.label}</ListItemText>
                </ListItem>
            </ListLink>
        )
    }

    const logout = () => {
        dispatch(actions.clearUser())
    }

    useEffect(() => {
        if(sidebar.isShown && !showText){
            setTimeout(() => {
                setShowText(true)
            }, 300)
        } 
        if(!sidebar.isShown && showText){
            setShowText(false)
        }
    }, [sidebar.isShown])
    

    return (
        <Container fullWidth={sidebar.isShown} openedForm={openedForm}>
            <Content>
                <Top>
                    <IconContainer header onClick={() => dispatch(actions.toggleSideBar())}>
                        <FontAwesomeIcon 
                            icon="bars"
                            size="lg"
                        />
                    </IconContainer>
                    <ListItemText shown={showText}>
                        <TopText>
                            {salutationText()} {user && user.username}
                        </TopText>
                    </ListItemText>
                </Top>
                <List>
                    {links.map(link => renderLink(link))}
                </List>
                <Logout shown={showText} onClick={logout}>
                    <IconContainer>
                        <FontAwesomeIcon 
                            icon="power-off"
                            size="1x"
                        />
                    </IconContainer>
                    <ListItemText shown={showText}>
                        Log Out
                    </ListItemText>
              
                </Logout>
            </Content>
        </Container>
    )
}

export default SideBar