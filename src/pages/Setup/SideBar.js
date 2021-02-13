import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch , useSelector } from 'react-redux'
import * as actions from '../../store/actions'

const Container = styled.div`
    position: fixed;
    z-index: 5;
    top: 5.4rem;
    left: 0;
    width: 25rem;
    height: calc(100vh - 5.4rem);
    box-shadow: 0px 1px 2px -1px rgb(113 113 113 / 75%);
    background: ${props => props.theme.primary};
`

const List = styled.ul`
    width: 100%;
    padding-top: 8rem;

    > li:not(last-child){
        margin-bottom: 7rem;
    }
`

const ListItem = styled.li`
    padding: 0rem 4.5rem;
    margin-bottom: 1rem;
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    svg {
        color: ${props => props.theme.text_light};
    };


    
    ${props => {
        if(props.active){
            return {
                ".icon-container": {
                    background: "white"
                },
                "svg": {
                    color: props.theme.primary
                }
            }
        }
    }}

    
    ${props => {
        if(props.isValid){
            return {
                color: props.theme.green,
                ".icon-container": {
                    background: props.theme.green
                },
                "svg": {
                    color: props.theme.white
                }
            }
        }
    }}

`

const ListItemBar = styled.div`
    position: absolute;
    top: 100%;
    right: 7.5rem;
    width: 2px;
    height: 7rem;
    background: ${props => props.theme.text_light};
`

const ListItemText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

const ListItemTextAction = styled.div`
    color: ${props => props.theme.text_light};
    font-size: 1.4rem;
`

const ListItemTextName = styled.div`
    font-size: 1.8rem;
    color: ${props => props.theme.white};
`

const ListItemIcon = styled.div`
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    border: 1px solid;
    border-color: ${props => props.isValid ? "inherit" : props.theme.text_light};
    display: flex;
    align-items: center;
    justify-content: center;
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
    padding-left: 3rem;
    transition: all .3s ease-in;
    color: ${props => props.theme.text_light};
`

const LogoutText = styled.div``



const LogoutIcon = styled.div`
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
`

 const SideBar = props => {

    const { sections, currentSection } = props
    const dispatch = useDispatch()

    const {
        text : { currentPage : text }
    } = useSelector(state => state)



     const renderItem = (item, index)=> {
         const active = currentSection === index
        const { name, isValid, action } = item
         return (
             <ListItem key={index} active={active} isValid={isValid}>
                 <ListItemText>
                    <ListItemTextAction>{action}</ListItemTextAction>
                    <ListItemTextName>{name}</ListItemTextName>
                </ListItemText>
                 <ListItemIcon isValid={isValid} active={active} className="icon-container">
                    <FontAwesomeIcon 
                        icon={item.icon}
                        size="lg"
                    />
                 </ListItemIcon>
                 {index !== sections.length -1 && (
                    <ListItemBar />
                 )}
             </ListItem>
         )
     }
    return (
        <Container>
            <List>
                {sections.map((item, index) => renderItem(item, index))}
            </List>
            {/* <Logout onClick={() => dispatch(actions.clearUser())}>
                    <LogoutIcon>
                        <FontAwesomeIcon 
                            icon="power-off"
                            size="1x"
                        />
                    </LogoutIcon>
                    <LogoutText>
                        {text.logout}
                    </LogoutText>     
            </Logout> */}
        </Container>
    )
}

export default SideBar