import React, { useState, useEffect } from 'react'
import { SectionContainer } from '../../Settings-style'
import { Section, Title, TextContainer, Text} from '../../Settings-style'
import { useSelector, useDispatch } from 'react-redux'
import { AppInput, Label } from '../../../../functions/form-style'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Loader, Tail, Modal, Success } from '../../../../components'
import { client } from '../../../../functions'
import { withRouter } from 'react-router-dom'
import * as actions from '../../../../store/actions'

const SectionItem = styled.div`
    position: relative;
    margin-bottom: 3rem;

    svg {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        right: 2rem;
        color: ${props => props.theme.text};
        cursor: pointer;
    }
`

const SubmitButton = styled(Button)`
    padding: .3rem 2rem;
    min-width: 10rem;
`

const ButtonContainer = styled.div`
    position: relative;
    min-height: 4.5rem;
    width: 11rem;
    margin-top: 3rem;
`

const PasswordReqList = styled.ul`
    padding-left: 20px;
`



const ModalContent = styled.div`
    width: 100%;
    height: 20rem;
    display: flex;
    justify-content: center;
    padding: 2rem 4rem;
`

const SuccessContainer = styled.div`
    position: relative;
    height: 14rem;
    display: flex;
    align-items: flex-end;

`

const SuccessText = styled.div`
    font-size: 1.6rem;
    color: ${props => props.theme.green};
`

const LoginAgain = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button {
        margin-top: 3rem;
        max-width: 10rem;
    }
`

const LoginAgainText = styled.div`
    font-size: 1.6rem;
`

const Password = props => {
    const dispatch = useDispatch()
    const { 
        user,
        text: { currentPage: text },
        theme: { green }
    } = useSelector(state => state)

    const [ currentPassword , setCurrentPassword ] = useState("")
    const [ newPassword, setNewPassword ] = useState("")
    const [ confirmNewPassword, setConfirmNewPassword] = useState("")

    const [ showModalSuccess, setShowModalSuccess] = useState(false)

    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)

    const [ loading, setLoading] = useState(false)
    const [ signature, setSignature] = useState(null)


    useEffect(() => {
        if(showModalSuccess === "success"){
            setTimeout(() => {
                setShowModalSuccess("login")
            }, 1500)
        }
    },[showModalSuccess])


    const lengthIsValid = newPassword.length >= 8
    const includeNumber = /\d/.test(newPassword) 
    const includeUppercase = /^(?=.*[A-Z])/.test(newPassword)
    const includeSpecial = /^(?=.*[@$!%*?&])/.test(newPassword)
    const passwordIsValid = lengthIsValid && includeNumber && includeUppercase && includeSpecial
    const confirmPasswordIsValid = newPassword === confirmNewPassword
    const passwordRequirement = (
        <>
            <div>{text.password_requirement_intro}:</div>
            <PasswordReqList>
                <li style={{color: lengthIsValid ? green : "white"}}>{text.password_requirement_length}</li>
                <li style={{color: includeNumber ? green : "white"}}>{text.password_requirement_number}</li>
                <li style={{color: includeUppercase ? green : "white"}}>{text.password_requirement_text}</li>
                <li style={{color: includeSpecial ? green : "white"}}>{text.password_requirement_special}</li>
            </PasswordReqList>
        </>
    )
       

    const renderTail = (text) => (
        <Tail
            bottom="943px"
            type="information"
            // style={style}
        >
           {text}
        </Tail>
    )

    const getChangePasswordSignature = async () => {
        if(currentPassword !== ""){
            setLoading(true)
            try {
                const res = await client.get(`/user/change-password-signature?password=${currentPassword}`)
                setSignature(res.data.data)
                setLoading(false)
            } catch (err){
                console.log('err', err)
                setLoading(false)
            }
        }
    }

    const changePassword = async () => {
        if(passwordIsValid && confirmPasswordIsValid && signature){
            setLoading(true)
            try {
                const res = await client.post(`/user/change-password`, { password: newPassword, signature })
                console.log(res)
                setLoading(false)
            } catch (err){
                console.log('err', err)
                setLoading(false)
            }
        }
    }

    const validatePasswordNode = (
        <SectionItem>
            <AppInput 
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                id="password"
                placeholder={text.password}
                type={showCurrentPassword ? "text" : "password"}
            />
            <FontAwesomeIcon 
                icon={showCurrentPassword ? "eye-slash" : "eye"}
                size="1x"
                onClick={() => setShowCurrentPassword(prev => !prev)}
            />
        </SectionItem>

    )

    const changePasswordNode = (
        <>
            <SectionItem>
                <AppInput 
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    id="new_password"
                    placeholder={text.password}
                    type={showNewPassword ? "text" : "password"}
                />
                <FontAwesomeIcon 
                    icon={showNewPassword ? "eye-slash" : "eye"}
                    size="1x"
                    onClick={() => setShowNewPassword(prev => !prev)}
                />
                {!passwordIsValid && renderTail(passwordRequirement)}
            </SectionItem>
            <SectionItem>
                <AppInput 
                    value={confirmNewPassword}
                    onChange={e => setConfirmNewPassword(e.target.value)}
                    id="confirm_new_password"
                    placeholder={text.password}
                    type={showConfirmNewPassword ? "text" : "password"}
                />
                <FontAwesomeIcon 
                    icon={showConfirmNewPassword ? "eye-slash" : "eye"}
                    size="1x"
                    onClick={() => setShowConfirmNewPassword(prev => !prev)}
                />
                {passwordIsValid && !confirmPasswordIsValid && confirmNewPassword.length > 7 && renderTail("Password doesn't match")}
            </SectionItem>

        </>
    )

    const successNode = (
        <SuccessContainer>
            <Success />
            <SuccessText>
                {text.change_password_success}
            </SuccessText>
        </SuccessContainer>
    )

    const closeSuccessModal = () => {
        dispatch(actions.clearUser())
        props.history.push("/login")
    }

    const loginAgainNode = (
        <LoginAgain>
            <LoginAgainText>Please Login with your new password</LoginAgainText>
            <Button onClick={closeSuccessModal}>
                Ok
            </Button>
        </LoginAgain>
    )

   

    return (
            <Section>
                <Title>{text.password}</Title>
                <TextContainer>
                    <Text>{text.enter_current_password}</Text>
                </TextContainer>
                <SectionItem>
                    {signature ? changePasswordNode :  validatePasswordNode }
                    <ButtonContainer>
                        {loading ? 
                            <Loader /> :
                            <SubmitButton square secondary onClick={signature ? changePassword : getChangePasswordSignature}>
                                {signature ? text.change : text.verify}
                            </SubmitButton>      
                        }
                    </ButtonContainer>
                </SectionItem>
                {showModalSuccess && (
                    <Modal>
                        <ModalContent>
                            {showModalSuccess === "success" && successNode}
                            {showModalSuccess === "login" && loginAgainNode}
                        </ModalContent>             
                    </Modal>
                )}

            </Section>
    )
}

export default withRouter(Password) 
