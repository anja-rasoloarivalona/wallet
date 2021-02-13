import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
    position: fixed;
    z-index: ${props => props.openedForm ? 1 : 12};
    left: 0;
    width: ${props => props.fullWidth ? "25rem" : "7rem"};
    height: calc(100vh - 5.4rem);
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:  ${props => props.openedForm ? "all 0s ease-in" : "all .3s ease-in"};

    @media (max-width: 767px){
        width: 25rem;
        transform: translateX(-25rem);
    }
`

const Content = styled.div`
    width: 100%;
    height: 100%;
    background: ${props => props.theme.primary};
    box-shadow: 0px 1px 2px -1px rgb(113 113 113 / 75%);
    position: relative;
    z-index: 3;
`

const IconContainer = styled.div`
    width: 7rem;
    min-width: 7rem;
    max-width: 7rem;
    height: 7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    z-index: 10;

    ${props => {
        if(!props.header){
            return {
                height: "6rem"
            }
        }
    }}
`



const Toggler = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.6rem;
    position: absolute;
    top: 0;
    bottom: 0;
    right: -2rem;
    margin: auto;
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
    background: ${props => props.theme.surface};
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all .3s ease-in;
    box-shadow: ${props => props.theme.box_shadow };
    border: 1px solid ${props => props.theme.primary};
    opacity: ${props => props.showToggle ? 1 : 0};

    svg {
        color: ${props => props.theme.primary}
    }
`

const List = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 4rem;
    list-style: none;
`

const ListItem = styled.li`
    font-size: 1.6rem;
    display: flex;
    align-items: center;

`



const ListItemText = styled.div`
    opacity: 0;
    position: relative;
    z-index: 2;

    ${props => {
        if(props.shown){
            return {
                opacity: 1
            }
        }
    }}
`

const ListLink = styled(NavLink)`
    &, &:visited {
        text-decoration: none;
        color: ${props => props.theme.text_light};
        position: relative;
    }
    &.active, &:hover {
        color: ${props => props.theme.surface};
    }
`

const Logout = styled.div`
    position: absolute;
    bottom: 8rem;
    left: 0;
    right: 0;
    margin: auto;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 1.8rem;
    padding-left: ${props => props.shown ? "3rem" : "0"};
    transition: all .3s ease-in;
    color: ${props => props.theme.text_light};
`

export {
    Container,
    Content,
    IconContainer,
    Toggler,
    List,
    ListItem,
    ListItemText,
    ListLink,
    Logout
}