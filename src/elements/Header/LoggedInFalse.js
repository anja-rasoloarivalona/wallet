import React, { useState } from 'react'
import { HeaderContainer, HeaderSection, HeaderSectionItem, HeaderSectionLink, HeaderButton,  LanguageToggle, LanguageToggleIcon, LanguageToggleText, LanguageToggleList, LanguageToggleListItem } from './Header-style'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../../assets/logo.png'
import logoDark from '../../assets/logo-dark-man.png'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'


const Logo = styled.img`
    object-fit: contain;
    width: 23rem;
    margin-left: 13rem;
    margin-top: 1.5rem;
    cursor: pointer;

    @media (max-width: 1343px){
        margin-left: 6rem;
    }

`

const Header = props => {
    const {
        text: { header : text, currentPage },
        settings: { lang },
        user
    } = useSelector(state => state)

    const [showLangList, setShowLangList] = useState(false)

    const dispatch = useDispatch()

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


    const  items = [
        {type: "link", label: text.login, path: `/${currentPage.link_login}`},
        {type: "link", label: text.signup, path: `/${currentPage.link_signup}`}
    ]


    const renderItem = item => {
        if(item.type === "link"){
            return (
            <HeaderSectionLink
                key={item.label}
                to={item.path}
                exact={item.exact ? item.exact : false}
            >
                {item.label}
            </HeaderSectionLink> 
            )
        }

        return (
            <HeaderButton key={item.label} onClick={item.onClick} background={item.background}>
                {item.icon && (
                    <FontAwesomeIcon 
                        icon={item.icon}
                        size="lg"
                    />
                )}
                {item.label}
            </HeaderButton>
        )
    }

 
    const renderLanguageToggler = () => {
        const toggleLangHandler = () => {
            const newLang = lang === "fr" ? "en" : "fr"
            dispatch(actions.setLang(newLang))
            setShowLangList(false)
    
        }
        return (
            <HeaderSectionItem
                showList={showLangList}
                onMouseOver={() => setShowLangList(true)}
                onMouseLeave={() => setShowLangList(false)}
            >
                <LanguageToggle>
                    <LanguageToggleText>{lang}</LanguageToggleText>
                    <LanguageToggleIcon 
                        size="1x"
                        icon="caret-down"
                    />
                </LanguageToggle>
                <LanguageToggleList>
                        <LanguageToggleListItem onClick={toggleLangHandler}>
                            {lang === "en" ? "fr" : "en"}
                        </LanguageToggleListItem>
                </LanguageToggleList>
            </HeaderSectionItem>
        )
    }




    return (
        <HeaderContainer>
            <HeaderSection>
            <Logo src={logo} alt="logo" onClick={() => props.history.push("/")}/>

            </HeaderSection>
            <HeaderSection>
                {items.map(item => renderItem(item))}
                {renderLanguageToggler()}
            </HeaderSection>
        </HeaderContainer>
    )
}

export default withRouter(Header) 
