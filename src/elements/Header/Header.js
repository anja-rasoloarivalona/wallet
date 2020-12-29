import React, { useState, useEffect } from 'react'
import { HeaderContainer, HeaderSection, HeaderSectionItem, HeaderSectionLink, HeaderButton,  LanguageToggle, LanguageToggleIcon, LanguageToggleText, LanguageToggleList, LanguageToggleListItem } from './Header-style'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import { client } from '../../functions'
import styled from 'styled-components'
import logo from '../../assets/logo.png'
const Image = styled.img``


const Header = () => {
    const {
        text: { header : text },
        settings: { lang },
        user
    } = useSelector(state => state)
    const [ showLangList, setShowLangList] = useState(false)
    const [ currentSection, setCurrentSection] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        if(user.isLoggedIn){
            setCurrentSection("isLoggedIn")
        }
        if(!user.isLoggedIn){
            setCurrentSection("isLoggedOut")
        }
    },[user])

    const logout = async () => {
        console.log("logging out")
        try {
            await client.post("/logout")
            dispatch(actions.clearUser())
        } catch(err){
            console.log(err.message)
        }
    }

    const items = {
        isLoggedOut: [
            {type: "link", label: text.login, path: "/login"},
            {type: "link", label: text.signup, path: "/signup"}
        ],
        isLoggedIn: [
            {type: "button", label: text.logout, onClick: logout}
        ]
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
            <HeaderButton key={item.label} onClick={item.onClick}>
                {item.label}
            </HeaderButton>
        )
    }


    return (
        <HeaderContainer>
            <Image src={logo}/>
            <HeaderSection>
                {items[currentSection] && items[currentSection].map(item => renderItem(item))}
                {renderLanguageToggler()}
            </HeaderSection>
        </HeaderContainer>
    )
}

export default Header
