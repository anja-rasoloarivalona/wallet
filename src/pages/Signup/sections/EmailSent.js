import React from 'react'
import { Modal, ModalTitle, ModalTextContainer, ModalText } from '../Signup-style'

const EmailSent = props => {

    const { user } = props

    const textData = ["An email has been sent to:", user.email, " Please check it out to activate your account"]

    const renderText = () => (
        textData.map((text, index) => (
            <ModalText key={index} index={index}>
                {text}
            </ModalText>
        ))
    )
    return (
        <Modal>
            <ModalTitle>
                Welcome {user.userName}
            </ModalTitle>
            {renderText()}
        </Modal>
    )
}

export default EmailSent
