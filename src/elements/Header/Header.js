import React from 'react'
import { HeaderContainer, HeaderSection, HeaderSectionItem } from './Header-style'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'


const Header = () => {
    const text = useSelector(state => state.text.header)
    const { lang } = useSelector(state => state.settings)
    const dispatch = useDispatch()

    const links = {
        left: [
            // {label: text.dashboard, path: "/", exact: true},
            // {label: text.transactions, path: "/transactions"},
            // {label: text.report, path: "/report"}
        ],
        right: [
            {label: text.login, path: "/login"},
            {label: text.signup, path: "/signup"},
        ]
    }

    const changeLang = () => {
        const newLang = lang === "fr" ? "en" : "fr"
        dispatch(actions.setLang(newLang))

    }
    return (
        <HeaderContainer>
            {Object.keys(links).map(section => (
                <HeaderSection key={section}>
                    {links[section].map(link => (
                        <HeaderSectionItem
                            key={link.label}
                            to={link.path}
                            exact={link.exact ? link.exact : false}
                        >
                            {link.label}
                        </HeaderSectionItem>
                    ))}
                </HeaderSection>
            ))}
            {/* <div onClick={changeLang}>
                Change
            </div> */}
        </HeaderContainer>
    )
}

export default Header
