import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import { faFileAlt, faUser,  } from '@fortawesome/free-regular-svg-icons'

const Container = styled.div`
    position: fixed;
    z-index: ${props => props.openedForm ? 1 : 12};
    left: 0;
    width: ${props => props.fullWidth ? "25rem" : "7rem"};
    height: calc(100vh - 5.4rem);
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;

    transition:  ${props => props.openedForm ? "all 0s ease-in" : "all .3s ease-in"};

    // background: red;



`

const Content = styled.div`
    width: 100%;
    height: 100%;
    background: ${props => props.theme.primary};
    color: ${props => props.theme.text};
    box-shadow: 0px 1px 2px -1px rgb(113 113 113 / 75%);
    position: relative;
    z-index: 3;
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
    // background:  ${props => props.theme.surface};

    ${props => {
        if(!props.header){
            return {
                height: "6rem"
            }
        }
    }}
`




const Toggler = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.6rem;
    position: absolute;
    top: 0;
    bottom: 0;
    right: -2rem;
    margin: auto;
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
    background: ${props => props.theme.surface};
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all .3s ease-in;
    box-shadow: ${props => props.theme.box_shadow };
    border: 1px solid ${props => props.theme.primary};
    opacity: ${props => props.showToggle ? 1 : 0};



    svg {
        color: ${props => props.theme.primary}
    }
`



const List = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 4rem;
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
        color: ${props => props.theme.surface};
    }

    &.active:after {
        // content: "";
        // position: absolute;
        // top: 0;
        // bottom: 0;
        // right: 0;
        // margin: auto;
        // width: .5rem;
        // height: 70%;
        // background:  ${props => props.theme.text};
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
     const location = useLocation()
    const dispatch = useDispatch()
    const {
        text : { currentPage : text },
        ui: { sidebar, openedForm },
        user
    } = useSelector(state => state)

    const [showText, setShowText ] = useState(sidebar.isShown)
    const [showToggle, setShowToggle] = useState(false)


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
        { link: `/${text.link_dashboard}`, icon: "chart-line", label: text.dashboard},
        { link: `/${text.link_transactions}`, icon: faFileAlt, label: text.transactions, exact: false},
        { link: `/${text.link_profile}`, icon: "calculator", label: text.profile, exact: false },
        { link: `/${text.link_settings}`, icon: "cogs", label: text.settings, exact: false}
    ]

    const renderLink = item => {
        return (
            <ListLink key={item.link} to={item.link} exact={item.exact}>
                <ListItem>
                    <IconContainer>
                        <FontAwesomeIcon 
                            icon={item.icon}
                            size="lg"
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



    if(!user || !user.token || location.pathname === "/" || location.pathname === `/${text.link_setup}`){
        return <div></div>
    }


    let timeout
    const stopTimeout = () => {
        setShowToggle(true)
        clearTimeout(timeout)
    }
    const startTimeOut = () => {
        timeout = setTimeout(() => {
            setShowToggle(false)
        }, 1000)
    }

    return (
        <Container
            fullWidth={sidebar.isShown}
            openedForm={openedForm}
            onMouseEnter={stopTimeout}
            onMouseLeave={startTimeOut}
        >
            <Content>
                <Toggler           
                    onClick={() => dispatch(actions.toggleSideBar())}
                    showToggle={showToggle}
                >
                    <FontAwesomeIcon 
                        icon={sidebar.isShown ? "chevron-left" : "chevron-right"}
                        size="lg"
                    />
                </Toggler>
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