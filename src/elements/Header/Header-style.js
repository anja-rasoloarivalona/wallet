import styled from 'styled-components'
import { Link } from '../../components'

const HeaderContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 5rem;
    width: 100vw;
    padding: 0 300px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
