import React from 'react'
import { HeaderContainer, HeaderSection, HeaderSectionItem } from './Header-style'

const Header = () => {
    const links = {
        left: [
            {label: "Dashboard", path: "/", exact: true},
            {label: "Transactions", path: "/transactions"},
            {label: "Report", path: "/report"}
        ],
        right: [
            {label: "Login", path: "/login"},
            {label: "Signup", path: "/signup"}
        ]
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
        </HeaderContainer>
    )
}

export default Header
