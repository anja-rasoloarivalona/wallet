import React, { useState, useEffect } from 'react'
import { HeaderContainer, HeaderSection } from './Header-style'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import { client } from '../../functions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

const IconContainer = styled.div`
    position: relative;
    cursor: pointer;

    svg {
        color:  ${props => props.showList ?  props.theme.active_text : props.theme.text};
        
    }

    :hover {
        svg {
            color:  ${props => props.theme.active_text};
            
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

    const renderMenu = () => {
        return (
            <IconContainer
                showList={showList}
                onClick={() => setShowList(prev => !prev)}
            >
                <FontAwesomeIcon 
                    icon="cog"
                    size="lg"
                />
                {showList && (
                    <Menu>
                        <MenuItem>Language</MenuItem>
                        <MenuItem>Currency</MenuItem>
                        <MenuItem>Theme</MenuItem>
                        <MenuItem>Design</MenuItem>
                        <MenuItem>Logout</MenuItem>
                    </Menu>
                )}
            </IconContainer>
        )
    }




    return (
        <HeaderContainer>
            <Salutation>
                {salutationText()} {user.username} !
            </Salutation>
            <Dynamic>
                <div>Overview</div>
                <div>Edit</div>     
            </Dynamic>
            <HeaderSection>
                {renderMenu()}
            </HeaderSection>


        </HeaderContainer>
    )
}

export default Header
