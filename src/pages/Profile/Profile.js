import React from 'react'
import { Container, Content } from './Profile-style'
import Assets from './sections/Assets'
import Budget from './sections/Budget'
import Goal from './sections/Goal'

const Profile = () => {
    return (
        <Container>
            <Content>
                <Assets />
                <Budget /> 
                <Goal />
            </Content>
        </Container>
    )
}

export default Profile
