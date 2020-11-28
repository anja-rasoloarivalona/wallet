import React from 'react'
import {EmailSentContainer, EmailSentTitleContainer, EmailSentTitle, EmailSentTitleIcon, EmailSentModal, EmailSentText } from '../Signup-style'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const EmailSent = props => {
    const { user } = props
    if(!user){
        return <div></div>
    }
    return (
        <EmailSentContainer>
            <EmailSentTitleContainer>
                <EmailSentTitleIcon 
                    icon={faEnvelope}
                    size="3x"
                />
                <EmailSentTitle>
                    Email sent to
                </EmailSentTitle>
            </EmailSentTitleContainer>
            <EmailSentModal>
                {user.email}
            </EmailSentModal>
            <EmailSentText>
                Please check it out to activate your account
            </EmailSentText>
        </EmailSentContainer>

    )
}

export default EmailSent
