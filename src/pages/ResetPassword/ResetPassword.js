import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppInput } from '../../functions/form-style'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Loader, Tail, Modal, Success } from '../../components'
import { client } from '../../functions'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'


const Container = styled.div`
    min-height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    margin-top: 7.5rem;
    padding-top: 7rem;

    * {
        box-sizing: border-box;
    }
`

const Title = styled.div`
    color: ${props => props.theme.text};
    font-size: 3rem;
    font-weight: 500;
    margin-bottom: 2rem;
    text-align: center;
`

const Input = styled.div`
    position: relative;
    margin-top: 3rem;

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

const Content = styled.div`

`

const FormContainer = styled.div`
    width: 90vw;
    max-width: 35rem;
    margin-top: 5rem;
`

const SubmitButton = styled(Button)`
    padding: .3rem 2rem;
    min-width: 10rem;
`

const ButtonContainer = styled.div`
    position: relative;
    min-height: 4.5rem;
    width: 100%;
    margin-top: 5rem;
    display: flex;
    justify-content: center;
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

const ResetPassword = props => {

    const { 
        user,
        text: { currentPage: text },
        theme: { green }
    } = useSelector(state => state)

    const location = useLocation()

    const [ newPassword, setNewPassword ] = useState("")
    const [ confirmNewPassword, setConfirmNewPassword] = useState("")
    const [ showModalSuccess, setShowModalSuccess] = useState(false)


    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)

    const [ loading, setLoading] = useState(false)
    const [ signature, setSignature ] = useState(null)



    useEffect(() => {
        const parsed = queryString.parse(location.search);
        if(parsed && parsed.id && parsed.signature){
            checkSignature(parsed)
        }
    },[])

    useEffect(() => {
        if(showModalSuccess === "success"){
            setLoading(false)
            setTimeout(() => {
                setShowModalSuccess("login")
            }, 1500)
        }
    },[showModalSuccess])




    const checkSignature = async data => {
        const { signature, id } = data
        try {
            const res = await client.post('/check-reset-signature', {
                signature,
                id
            })
            const resData = res.data
            if(resData.data && resData.data.signature){
                setSignature(resData.data.signature)
            } else {
                props.history.push("/")
            }
          
        } catch(err){
            console.log('INVALID SIGNATURE', err.response)
            console.log(err.message)
            props.history.push("/")
        }
    }



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
            style={{fontSize: "13px"}}
        >
           {text}
        </Tail>
    )

    const changePassword = async () => {
        if(passwordIsValid && confirmPasswordIsValid && signature){
            setLoading(true)
            try {
                const res = await client.post(`/reset-password`, { password: newPassword, signature })
                if(res.status !== 201){
                    console.log("FAILED TO CHANGE PASSWORD", res)
                }
                setShowModalSuccess("success")
            } catch (err){
                console.log('err', err)
                setLoading(false)
            }
        }
    }

    const changePasswordNode = (
        <FormContainer>
            <Input>
                <AppInput 
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    id="new_password"
                    placeholder={text.password}
                    type={showNewPassword ? "text" : "password"}
                />
                <FontAwesomeIcon 
                    icon={showNewPassword ? "eye-slash" : "eye"}
                    size="lg"
                    onClick={() => setShowNewPassword(prev => !prev)}
                />
                {!passwordIsValid && renderTail(passwordRequirement)}
            </Input>
            <Input>
                <AppInput 
                    value={confirmNewPassword}
                    onChange={e => setConfirmNewPassword(e.target.value)}
                    id="confirm_new_password"
                    placeholder={text.password}
                    type={showConfirmNewPassword ? "text" : "password"}
                />
                <FontAwesomeIcon 
                    icon={showConfirmNewPassword ? "eye-slash" : "eye"}
                    size="lg"
                    onClick={() => setShowConfirmNewPassword(prev => !prev)}
                />
                {passwordIsValid && !confirmPasswordIsValid && confirmNewPassword.length > 7 && renderTail("Password doesn't match")}
            </Input>

        </ FormContainer>
    )

    const successNode = (
        <SuccessContainer>
            <Success />
            <SuccessText>
                Your password has been changed
            </SuccessText>
        </SuccessContainer>
    )

    const closeSuccessModal = () => {
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
        <Container>
            <Content>
                <Title>Change password</Title>
                {changePasswordNode}
                <ButtonContainer>
                        {loading ? 
                            <Loader /> :
                            <SubmitButton square secondary onClick={changePassword}>
                                Change
                            </SubmitButton>      
                        }
                    </ButtonContainer>
            </Content>
            {showModalSuccess && (
                    <Modal>
                        <ModalContent>
                            {showModalSuccess === "success" && successNode}
                            {showModalSuccess === "login" && loginAgainNode}
                        </ModalContent>             
                    </Modal>
             )}
        </Container>
    )
}

export default ResetPassword