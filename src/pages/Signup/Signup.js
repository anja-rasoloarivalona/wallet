import React, { useEffect, useState } from 'react'
import {Container, Modal, Title, OrTextContainer, OrText, OrTextLine, SignupOther, PasswordReqList, Disclaimer } from './Signup-style'
import { formFunctions, Tail } from '../../components'
import { useSelector, useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form } from '../../components'
import * as actions from '../../store/actions'
import { client  } from '../../functions'
import EmailSent from './EmailSent'


const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const Signup = () => {
    const dispatch = useDispatch()
    const {
        text: { currentPage: text, errors: errorText },
        theme: { green, grey_dark },
    } = useSelector(state => state)
   
    const [showPassword, setShowPassword] = useState(false)
    const [usedEmails, setUsedEmails] = useState([])
    const [userEmail, setUserEmail] = useState(null)

    const [values, getValues] = useState({})
    const [errors, getErrors] = useState({})


    const inputsData = [
        {
            id: "username",
            type: "text",
            name: "username",
            label: text.username,
            placeholder: text.username,
            input_type: "input",
            maxLength: 30,
            required: true
        },
        {   
            id: "email",
            type: "email",
            name: "email",
            label: text.email,
            placeholder: text.email,
            input_type: "input",
            children: null,
            required: true
        },
        {   
            id: "password",
            type: "password",
            name: "password",
            label: text.password,
            placeholder: text.password,
            input_type: "input",
            children: null,
            required: true,
            unit: <FontAwesomeIcon 
                      icon="eye"
                      size="2x"
                      color={grey_dark}
                      onClick={() => setShowPassword(prev => !prev)}
                  />
        }
    ]

    const [inputs, setInputs] = useState(inputsData)

    const signupHandler = async data => {
        if(usedEmails.includes(data.email)) return
        try {
            const res = await client({
                method: "post",
                url: "/signup",
                data: data
            })
            if(res.status !== 201){
                return dispatch(actions.setError({error: errorText.signup_failed}))
            }
            setUserEmail(data.email)
        } catch(error){
            const { response } = error

            if(response.status === 409){
                setUsedEmails(prev => [...prev, data.email])
                return formFunctions.setErrors({ email: errorText.email_taken})
            } else {
                const message = response.data.message      
                dispatch(actions.setError({error: message}))
            
            }
        }
    } 

    useEffect(() => {
        if(values.email){
            if(usedEmails.includes(values.email)){
                formFunctions.setErrors({ email: errorText.email_taken})
            }
        }
    },[values.email, usedEmails, errors])
    
    useEffect(() => {
        const { password } = values
        const lengthIsValid = password && password.length >= 8 ? true : false
        const includeNumber = /\d/.test(password) 
        const includeUppercase = /^(?=.*[A-Z])/.test(password)
        const includeSpecial = /^(?=.*[@$!%*?&])/.test(password)
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

        if(password !== "" && !passwordRegex.test(password)){
            tailHandler({
                action: "set",
                index: 2,
                text: passwordRequirement,
                type: "information",
                style: {   
                    "maxWidth": "38rem",
                    "> div": {
                        padding: "2rem"
                    }
                }
            })
        } else {
            tailHandler({
                action: "clear",
                index: 2
            })
        }
    },[values.password])


    useEffect(() => {
        const updatedInputs = inputs.map(input => ({...input}))
        const type = showPassword ? "text" : "password"
        updatedInputs[2].type = type
        updatedInputs[2].unit = (
            <FontAwesomeIcon 
                icon={showPassword ? "eye-slash" : "eye"}
                size="2x"
                color={grey_dark}
                onClick={() => setShowPassword(prev => !prev)}
                style={{cursor: "pointer"}}
            />
        )
        setInputs(updatedInputs)

    },[showPassword])

    useEffect(() => {
        const updatedInputs = inputs.map(input => ({...input}))
        updatedInputs.forEach((input, index) => {
            updatedInputs[index].label = text[input.name]
            updatedInputs[index].placeholder = text[input.name]
        })
        setInputs(updatedInputs)
    }, [text])


    const tailHandler = props => {
        const { action, index, text, type, style } = props
        const updatedInputs = inputs.map(input => ({...input}))
        if(action === "set"){
            updatedInputs[index].children = () => renderTail(text, type, style)
            setInputs(updatedInputs)
        }
        if(action === "clear" && updatedInputs[index].children !== null){
            updatedInputs[index].children = null
            setInputs(updatedInputs)
        }
    }

    const renderTail = (text, type, style) => (
        <Tail
            bottom="943px"
            type={type}
            style={style}
        >
           {text}
        </Tail>
    )


    return (
        <Container>
            <Modal>   
                <Title>
                    {text.title}
                </Title>     
                <Form
                    inputs={inputs}
                    submitHandler={signupHandler}
                    buttonLabel={text.signup}
                    getValues={values => getValues(values)}
                    getErrors={errors => getErrors(errors)}
                >
                    <OrTextContainer>
                        <OrTextLine />
                            <OrText> {text.or}</OrText>
                        <OrTextLine />
                    </OrTextContainer>
                    <SignupOther>
                        {text.signup_google_facebook}
                    </SignupOther>
                </Form>
            </Modal>
            {!userEmail && (
                <Disclaimer>
                    By clicking "Sign up", your are creating a Monefy account, and you agree to Monefy's Terms of Use and Privacy Policy
                </Disclaimer>
            )}
        </ Container>
    )
}


export default Signup