import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Link = styled(NavLink)`
    &, &:link, &:visited {
        color: ${props => props.theme.black};
        text-decoration: none;
    }
    &:hover, &.active {
        color: ${props => props.theme.grey};
    }
`

export {
    Link
}