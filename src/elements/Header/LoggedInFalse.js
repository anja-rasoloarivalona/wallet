import React, { useState } from 'react'
import { HeaderContainer, HeaderSection, HeaderSectionItem, HeaderSectionLink, HeaderButton,  LanguageToggle, LanguageToggleIcon, LanguageToggleText, LanguageToggleList, LanguageToggleListItem } from './Header-style'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const Header = () => {
    const {
        text: { header : text },
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
        {type: "link", label: text.login, path: "/login"},
        {type: "link", label: text.signup, path: "/signup"}
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
                 {/* {salutationText()} {user.username} ! */}
            </HeaderSection>
            <HeaderSection>
                {items.map(item => renderItem(item))}
                {renderLanguageToggler()}
            </HeaderSection>
        </HeaderContainer>
    )
}

export default Header
