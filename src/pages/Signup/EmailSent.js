import React from 'react'
import {EmailSentContainer, EmailSentTitleContainer, EmailSentTitle, EmailSentTitleIcon, EmailSentModal, EmailSentText } from './Signup-style'

const EmailSent = props => {
    const { email } = props
    if(!email){
        return <div></div>
    }
    return (
        <EmailSentContainer>
            <EmailSentTitleContainer>
                <EmailSentTitleIcon 
                    icon="envelope"
                    size="3x"
                />
                <EmailSentTitle>
                    Email sent to
                </EmailSentTitle>
            </EmailSentTitleContainer>
            <EmailSentModal>
                {email}
            </EmailSentModal>
            <EmailSentText>
                Please check it out to activate your account
            </EmailSentText>
        </EmailSentContainer>

    )
}

export default EmailSent
