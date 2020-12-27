import styled from 'styled-components'
import { Link } from '../../components'

const HeaderContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 7.5rem;
    width: 100vw;
    padding: 0 150px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${props => props.theme.clr_surface};
    color: ${props => props.theme.clr_text};
    z-index: 10;
`

const HeaderSection = styled.div`
    a:not(:last-child){
        margin-right: 3rem;
    }
`

const HeaderSectionItem = styled(Link)`
    font-size: 1.6rem;
`

export {
    HeaderContainer,
    HeaderSection,
    HeaderSectionItem
}
