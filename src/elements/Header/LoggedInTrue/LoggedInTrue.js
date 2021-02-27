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
import logo from '../../../assets/logo.png'





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
    padding-left: 2rem;
`

const Logo = styled.img`
    width: 19rem;
    object-fit: contain;
`

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



const Header = props => {
    const {
        text: { currentPage: text},
        user: { transactions },
        ui: { dashboard }
    } = useSelector(state => state)

    const location = useLocation()

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

    const renderSearchBarNav = () => {
        if(location.pathname.substr(1) === text.link_settings){
            const links = [
                { label: text.general, section: text.link_general},
                {label: text.account,  section: text["link_my-account"]}
            ]
            return <Navigation>{links.map(renderSectionLink)}</Navigation>
        }
        if(!_.isEmpty(transactions)){
            return <SearchBar />
        }

        return <div>Found nothing</div>

    }


    return (
        <Container>
            <LogoContainer>
                <Logo 
                    src={logo}
                />
            </LogoContainer>
            {!dashboard.isManaging && (
                <>
                    {renderSearchBarNav()}
                    <ActionContainer>
                        <ProfileDropDown />
                        <ActionDropdown />
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
