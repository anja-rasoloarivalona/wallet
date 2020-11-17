import React, { useState } from 'react'
import { Container } from './Signup-style'
import Form from './sections/Form'
import EmailSent from './sections/EmailSent'


const Signup = () => {
    const [user, setUser] = useState(null)

    return (
        <Container>
            {!user && <Form />}
            {user && <EmailSent user={user} />}
        </Container>
    )
}

export default Signup
