import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import { Container, Content , Logout, IconContainer , ListItemText } from './SideBarStyle'
import Main from './versions/SidebarMain'

const SideBar = () => {

    const location = useLocation()
    const dispatch = useDispatch()
    const {
        text : { currentPage : text },
        ui: { sidebar, openedForm },
        user
    } = useSelector(state => state)
    const [showToggle, setShowToggle] = useState(false)
    const [showText, setShowText ] = useState(sidebar.isShown)


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

    if(!user || !user.token || location.pathname === "/"){
        return <div></div>
    }

    return (
        <Container
            fullWidth={sidebar.isShown}
            openedForm={openedForm}
            onMouseEnter={stopTimeout}
            onMouseLeave={startTimeOut}
        >
            <Content>
                <Main 
                    showText={showText}
                    showToggle={showToggle}
                />
                <Logout shown={showText} onClick={() => dispatch(actions.clearUser())}>
                    <IconContainer>
                        <FontAwesomeIcon 
                            icon="power-off"
                            size="1x"
                        />
                    </IconContainer>
                    <ListItemText shown={showText}>
                        {text.logout}
                    </ListItemText>     
                </Logout>
            </Content>
        </Container>
    )
}

export default SideBar