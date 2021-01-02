import React from 'react'
import { Container, Title, Content } from './Profile-style'
import Assets from './sections/Assets'
import Budget from './sections/Budget'

const Profile = () => {
    return (
        <Container>
            <Title>Profile</Title>
            <Content>
                <Budget />
                <Assets />
            </Content>
        </Container>
    )
}

export default Profile
