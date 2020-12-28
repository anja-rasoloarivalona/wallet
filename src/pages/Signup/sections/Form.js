import React, { useEffect, useState } from 'react'
import {Title, SignupForm, ButtonContainer, SignupButton, OrTextContainer, OrText, OrTextLine, SignupOther, PasswordReqList } from '../Signup-style'
import { withFormik } from 'formik'
import { renderInput } from '../../../functions'
import {Loader, Tail} from '../../../components'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const Form = props => {
    const { errors, touched, handleChange, values, handleBlur, setFieldValue, submitting, usedEmails } = props
    const {
        text: { currentPage: text, errors: errorText },
        theme: { green, grey_dark },
    } = useSelector(state => state)
   
    const [showPassword, setShowPassword] = useState(false)

    const inputsData = [
        {
            id: "username",
            type: "text",
            name: "username",
            label: text.username,
            placeholder: text.username,
            input_type: "input",
        },
        {   
            id: "email",
            type: "email",
            name: "email",
            label: text.email,
            placeholder: text.email,
            input_type: "input",
            children: null
        },
        {   
            id: "password",
            type: "password",
            name: "password",
            label: text.password,
            placeholder: text.password,
            input_type: "input",
            children: null,
            unit: <FontAwesomeIcon 
                      icon="eye"
                      size="2x"
                      color={grey_dark}
                      onClick={() => setShowPassword(prev => !prev)}
                  />
        }
    ]

    const [inputs, setInputs] = useState(inputsData)

    useEffect(() => {
        if(usedEmails.includes(values.email)){
            tailHandler({
                action: "set",
                index: 1,
                text: errorText.email_taken
            })
        } else {
            tailHandler({
                action: "clear",
                index: 1
            })
        }

    },[usedEmails, values.email, inputs])
    
    useEffect(() => {
        const { password } = values
        const lengthIsValid = password.length >= 8
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

 

    return (
        <SignupForm>
            <Title>
                {text.title}
            </Title>
            {inputs.map((input, index) => renderInput({
                input,
                index,
                errors,
                touched,
                handleChange,
                values,
                onBlur: handleBlur,
                onChange: setFieldValue
            }))}
            <OrTextContainer>
                <OrTextLine />
                    <OrText> {text.or}</OrText>
                <OrTextLine />
            </OrTextContainer>
            <SignupOther submitting={submitting}>
                {text.signup_google_facebook}
            </SignupOther>
            <ButtonContainer>
                {!submitting ?
                    <SignupButton>
                        {text.signup}
                    </SignupButton> :
                    <Loader />
                }
            </ButtonContainer>
        </SignupForm>
    )
}

const EnhancedForm = withFormik({
    mapPropsToValues: () => {
        return {
            email: '',
            username: '',
            password: '',
        }
    },
    validationSchema: ({ text }) => {
        const empty = text.errors.required_field
   
        return Yup.object().shape({
                email: Yup.string().required(empty).email(text.errors.email_invalid),
                username: Yup.string().required(empty),
                password: Yup.string().required(empty)
        })
    },
    handleSubmit: async (values, {props}) => {
        const { signupHandler } = props
        await signupHandler(values)
    }
})(Form)

export default EnhancedForm