import React, { useState, useEffect, useRef } from 'react'
import { HeaderContainer, HeaderSection } from '../Header-style'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import { faBell } from  '@fortawesome/free-regular-svg-icons'
import {  faUser } from '@fortawesome/free-regular-svg-icons'
import SearchBar from './SearchBar'
import { useLocation, withRouter } from 'react-router-dom'
import ProfileDropDown from './ProfileDropDown'
import ActionDropdown from './ActionDropdown'
import DashboardManager from './DashboardManager'
import _ from 'lodash'
import { useOnClickOutside } from '../../../functions'

const Container = styled(HeaderContainer)`
    background: ${props => props.theme.surface};
    left: 0rem;
    width: 100vw;
    box-shadow: 0px 1px 2px -1px rgb(113 113 113 / 75%);
    z-index: 26;
`

const IconContainer = styled.div`
    position: relative;
    cursor: pointer;
    margin-left: 2rem;
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;


    svg {
        color:  ${props => props.theme.text};
    }

    :hover {
        background: ${props => props.theme.background};
    }

    ${props => {
        // if(props.iconStyle === "primary"){
        //     return {
        //         background: props.theme.primary,
        //         width: "4rem",
        //         height: "4rem",
        //         svg: {
        //             color: props.theme.surface,
        //             fontSize: "2rem"
        //         },
        //         ":hover": {
        //             background: props.theme.text_light,
        //             svg: {
        //                 color: props.theme.primary,
        //             },
        //         }
        //     }
        // }
    }}


`

const LogoContainer = styled(HeaderSection)`
    width: 25rem;
`

const Logo = styled.div``

const Menu = styled.div`
    position: absolute;
    top: calc(100% + 1rem);
    right: 0;
    width: 20rem;
    height: min-content;
    background: ${props => props.theme.surface};
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px 
`

const MenuItem = styled.div`
    padding: 1rem;
    color: ${props => props.theme.text};   
`

const Dynamic = styled(HeaderSection)`
    width: 100%;

    div {
        margin-right: 4rem;
    }
`
const Salutation = styled(HeaderSection)`
    width: 45rem;
    // background: blue
`

const Avatar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: capitalize;
    cursor: pointer;
    color:  ${props => props.theme.active_text};
    margin-left: 2rem;
    font-size: 1.6rem;

    svg {
        margin-left: 1rem;
        height: min-content;
    }


    // :hover {
    //     color:  ${props => props.theme.active_text};
    // }
`
const ActionContainer = styled(HeaderSection)`
    padding-right: 3rem;
    width: 25rem;
    display: flex;
    justify-content: flex-end;
`


const Navigation = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 7rem;
    width: calc(100% - 50rem);
`

const NavigationItem = styled.div`
    font-size: 1.6rem;
    margin-right: 3rem;
    min-width: 15rem;
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
`

const NavigationLabel = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    color: ${props => props.active ? props.theme.text : props.theme.text_light};
    cursor: pointer;
    :hover {
        color: ${props => props.theme.primary}
    }
`

const RenderAction = props => {
    const [ showList, setShowList ] = useState(false)
    const { id, icon, ListComponent, iconStyle } = props
    const container = useRef()

    useOnClickOutside(container, () => setShowList(false))

    return (
        <IconContainer
            showList={showList}
            onClick={() => setShowList(prev => !prev)}
            key={id}
            ref={container}
            iconStyle={iconStyle}
        >
            <FontAwesomeIcon icon={icon} size="lg"/>  
            {showList && ListComponent && (
                <ListComponent/>
            ) }
        </IconContainer>
    )
}



const Header = props => {
    const {
        text: { currentPage: text},
        user: { transactions },
        ui: { dashboard }
    } = useSelector(state => state)

    const location = useLocation()

    const actions = [
        { id: "haha", icon: faUser, ListComponent: ProfileDropDown },
        { id: "other", icon: "plus", ListComponent: ActionDropdown, iconStyle: "primary" },
    ]


    const renderSectionLink = link => {
        return (
            <NavigationItem
                key={link.section}
                onClick={() => props.history.push(`#${link.section}`)}
            >
                <NavigationLabel  active={location.hash && location.hash.substr(1) === link.section}>
                        {link.label}
                </NavigationLabel>      
            </NavigationItem>
        )
    }

    const links = [
        { label: text.general, section: text.link_general},
        {label: text.account,  section: text["link_my-account"]}
    ]

    useEffect(() => {
       console.log("mounted header")
    }, [])

    const renderSearchBarNav = () => {
        if(!_.isEmpty(transactions)){
            if(location.pathname.substr(1) !== text.link_settings){
                return <SearchBar />
            } else {
                return <Navigation>{links.map(renderSectionLink)}</Navigation>
            }
        } else {
            return <div></div>
        }

    }

    return (
        <Container>
            <LogoContainer>
                <Logo>Monetor</Logo>
            </LogoContainer>
            {!dashboard.isManaging && (
                <>
                    {renderSearchBarNav()}
                    <ActionContainer>
                        {actions.map(action => <RenderAction {...action} />)}
                    </ActionContainer>
                </>
            )}
            {dashboard.isManaging && (
                <DashboardManager />
            )}



        </Container>
    )
}

export default withRouter(Header) 
