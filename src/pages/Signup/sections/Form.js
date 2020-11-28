import React, { useEffect, useState } from 'react'
import {Title, SignupForm, ButtonContainer, SignupButton, OrTextContainer, OrText, OrTextLine, SignupOther } from '../Signup-style'
import { withFormik } from 'formik'
import { renderInput } from '../../../functions'
import {Loader, Tail} from '../../../components'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'

const Form = props => {
    const { errors, touched, handleChange, values, handleBlur, setFieldValue, submitting, usedEmails } = props
    const {  currentPage: text } = useSelector(state => state.text)

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
        }
    ]

    const [inputs, setInputs] = useState(inputsData)

    useEffect(() => {
        const emailAlreadyUsedHandler = action => { // Action equals to clear or set
            const updatedInputs = inputs.map(input => ({...input}))
            if(action === "set" && updatedInputs[1].children === null){
                updatedInputs[1].children = renderTail
                setInputs(updatedInputs)
            }
            if(action === "clear" && updatedInputs[1].children !== null){
                updatedInputs[1].children = null
                setInputs(updatedInputs)
            }
        }
        if(usedEmails.includes(values.email)){
            emailAlreadyUsedHandler('set')
        } else {
            emailAlreadyUsedHandler('clear')
        }
    },[usedEmails, values.email, inputs])
    

    const renderTail = () => (
        <Tail bottom="943px">
            This email address is already used
        </Tail>
    )

    return (
        <SignupForm>
            <Title>
                Create an account
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
                    <OrText>Or</OrText>
                <OrTextLine />
            </OrTextContainer>
            <SignupOther submitting={submitting}>
                Sign up with Google or Facebook
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
        const empty = "Required"
        return Yup.object().shape({
            email: Yup.string().required(empty).email("Enter an email please")
        })
    },
    handleSubmit: async (values, {props}) => {
        const { signupHandler } = props
        await signupHandler(values)
    }
})(Form)

export default EnhancedForm