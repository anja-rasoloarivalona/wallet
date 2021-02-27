import React from 'react'
import { HeaderContainer, HeaderSection } from '../Header-style'
import { useSelector} from 'react-redux'
import styled from 'styled-components'
import SearchBar from './SearchBar'
import { useLocation, withRouter } from 'react-router-dom'
import ProfileDropDown from './ProfileDropDown'
import ActionDropdown from './ActionDropdown'
import DashboardManager from './DashboardManager'
import MobileMenu from './MobileMenu'
import _ from 'lodash'
import { useWindowSize } from '../../../functions'
import logoDark from '../../../assets/logo-dark.png'
import logoLight from '../../../assets/logo-light.png'


const Container = styled(HeaderContainer)`
    background: ${props => props.theme.surface};
    left: 0rem;
    width: 100vw;
    box-shadow: 0px 1px 2px -1px rgb(113 113 113 / 75%);
    z-index: 26;


    @media screen and (max-width: 767px){
        background: ${props => props.theme.primary}
    }
`

const LogoContainer = styled(HeaderSection)`
    width: 25rem;
    padding-left: 2rem;
`

const Logo = styled.img`
    width: 19rem;
    object-fit: contain;

    @media screen and (max-width: 767px){
        width: 15rem;
    }
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

const MobileMenuIcon = styled.div``



const Header = props => {
    const {
        text: { currentPage: text},
        user: { transactions },
        ui: { dashboard }
    } = useSelector(state => state)

    const location = useLocation()
    const { windowWidth } = useWindowSize()

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
        if(location.pathname.substr(1) === text.link_settings && windowWidth > 767){
            const links = [
                { label: text.general, section: text.link_general},
                {label: text.account,  section: text["link_my-account"]}
            ]
            return <Navigation>{links.map(renderSectionLink)}</Navigation>
        }
        if(!_.isEmpty(transactions)){
            return <SearchBar />
        }

        return <div></div>

    }


    return (
        <Container>
            <LogoContainer>
                <Logo 
                    src={windowWidth > 767 ? logoDark : logoLight}
                />
            </LogoContainer>
            {!dashboard.isManaging && (
                <>
                    {renderSearchBarNav()}
                    <ActionContainer>
                        <ProfileDropDown />
                        <ActionDropdown />
                        {windowWidth <= 767 && <MobileMenu />}
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
