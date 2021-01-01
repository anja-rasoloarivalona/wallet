import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Link = styled(NavLink)`
    &, &:link, &:visited {
        color: ${props => props.theme.text};
        text-decoration: none;
    }
    &:hover, &.active {
        color: ${props => props.theme.active_text};
    }
`

export {
    Link
}