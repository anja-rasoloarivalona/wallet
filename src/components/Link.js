import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Link = styled(NavLink)`
    &, &:link, &:visited {
        color: ${props => props.theme.clr_text_semi_dark};
        text-decoration: none;
    }
    &:hover, &.active {
        color: ${props => props.theme.clr_text};
    }
`

export {
    Link
}