import React, { useState, useEffect } from 'react'
import { HeaderContainer, HeaderSection } from './Header-style'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import { client } from '../../functions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

const Container = styled(HeaderContainer)`
    background: ${props => props.theme.surface};
    left: 0rem;
    width: 100vw;
    box-shadow: 0px 1px 2px -1px rgb(113 113 113 / 75%);
`

const IconContainer = styled.div`
    position: relative;
    cursor: pointer;
    margin-left: 2rem;
    background: ${props => props.theme.text};
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;


    svg {
        color:  ${props => props.theme.active_text};

        :hover {
            // color:  ${props => props.theme.surface};
        }
        
    }


`

const Menu = styled.div`
    position: absolute;
    top: calc(100% + 1rem);
    right: 0;
    width: 20rem;
    height: min-content;
    background: ${props => props.theme.surface};
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px 
`

const MenuItem = styled.div`
    padding: 1rem;
    color: ${props => props.theme.active_text};   
`

const Dynamic = styled(HeaderSection)`
    width: 100%;

    div {
        margin-right: 4rem;
    }
    // background: red;
`
const Salutation = styled(HeaderSection)`
    width: 45rem;
    // background: blue
`

const Avatar = styled.div`
    width: 3rem;
    height: 3rem;
    border: 2px solid ${props => props.theme.text};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    text-transform: capitalize;
    background: ${props => props.theme.surface};

    :hover {
        color: white;
        background: ${props => props.theme.active_text};
        border: 2px solid ${props => props.theme.active_text};
    }
`


const Header = () => {
    const {
        text: { header : text },
        settings: { lang },
        user
    } = useSelector(state => state)

    const [showList, setShowList] = useState(false)

    const dispatch = useDispatch()

    const salutationText = () => {
        const [ time, period ] = new Date().toLocaleTimeString("en").split(" ")
        const hour = parseInt(time.split(":")[0]) 
        if(period === "AM"){
            return text.morning_salutation
        }
        if(hour >= 6){
            return text.evening_salutation
        }
        return text.noon_salutation
        
    }


    const logout = async () => {
        try {
            await client.post("/logout")
            dispatch(actions.clearUser())
        } catch(err){
            console.log(err.message)
        }
    }

    const RenderAction = props => {
        const [ showList, setShowList ] = useState(false)
        const { id, icon, list, avatar } = props

        const renderMenuItem = (item, index) => {
            return (
                <MenuItem key={index}>
                    {item}
                </MenuItem>
            )
        }

        return (
            <IconContainer
                showList={showList}
                onClick={() => setShowList(prev => !prev)}
                key={id}
            >
                {icon && <FontAwesomeIcon icon={icon} size="1x" /> }
                {avatar && (
                    <Avatar>
                        A
                    </Avatar>
                )}
                
                {showList && (
                    <Menu>
                        {list.map((item, index) => renderMenuItem(item, index))}
                    </Menu>
                )}
            </IconContainer>
        )
    }

    const actions = [
        { id: "other", avatar: true, list: ["Language", "Currency", "Theme", "Design", "Logout"]},
        { id: "main", icon: "plus", list: ["Language", "Currency", "Theme", "Design", "Logout"]},
        { id: "other", icon: "bell", list: ["Language", "Currency", "Theme", "Design", "Logout"]},
    ]


    return (
        <Container>
            <HeaderSection>
                
            </HeaderSection>
            <HeaderSection>
                {actions.map(action => <RenderAction {...action} />)}
            </HeaderSection>


        </Container>
    )
}

export default Header
