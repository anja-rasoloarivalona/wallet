import styled from 'styled-components'
import { Link, Button } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const HeaderContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 7.5rem;
    width: 100vw;
    padding: 0 5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${props => props.theme.clr_surface};
    color: ${props => props.theme.clr_text};
    z-index: 10;
`

const HeaderSection = styled.div`
    display: flex;
    align-items: center;

    a:not(:last-child){
        margin-right: 3rem;
    }
`
const HeaderSectionLink = styled(Link)`
    font-size: 1.6rem;
`

const HeaderSectionItem = styled.div`
    font-size: 1.6rem;
    position: relative;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;

    ul {
        display: none;
    }

    ${props => {
        if(props.showList){
            return {
                background: props.theme.clr_primary,
                "ul": {
                    display: "flex"
                }
            }
        }
    }}
`

const HeaderButton = styled(Button)`
    min-width: unset;
    padding: 0 4rem;
    margin-right: 1.5rem;
`

const LanguageToggle = styled.div`
    text-transform: uppercase;
    display: flex;
    align-items: center;
    padding: .8rem 2rem;
    cursor: pointer;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;

    :hover {
        background: ${props => props.theme.clr_primary};
    }


`
const LanguageToggleText = styled.div`
    margin-right: 1rem;
`
const LanguageToggleIcon = styled(FontAwesomeIcon)`
`

const LanguageToggleList = styled.ul`
    list-style: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 5;
`

const LanguageToggleListItem = styled.li`
    padding: .8rem 2rem;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    width: 100%;
    cursor: pointer;
    text-transform: uppercase;
    background: ${props => props.theme.grey_dark};
`

export {
    HeaderContainer,
    HeaderSection,
    HeaderSectionItem,
    HeaderSectionLink,
    HeaderButton,

    LanguageToggle,
    LanguageToggleText,
    LanguageToggleIcon,

    LanguageToggleList,
    LanguageToggleListItem
}
