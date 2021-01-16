import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { withFormik, Form as FormComponent } from 'formik'
import { renderInput } from '../../functions'
import { Button, Loader } from '../../components'
import * as Yup from 'yup'


const Container = styled.div`
    grid-column: 1 / -1;
    height: calc(100vh - 7.5rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${props => props.theme.background};
    margin-top: 7.5rem;
    padding-top: 7rem;
    overflow-y: overlay;

    form {
        width: 90vw;
        max-width: 35rem;
    }
`

const Title = styled.div`
    color: ${props => props.theme.text};
    font-size: 3rem;
    font-weight: 500;
    margin-bottom: 2rem;
    width: 100vw;
    text-align: center;
`

const ButtonContainer = styled.div`
    position: relative;
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 7rem;
`

const Cta = styled.div`
    display: flex;
    align-items: center;
    // background: red;
    width: 100%;
    margin-top: 2rem;
    padding-left: 1rem;
`

const CtaItem = styled.div`
    font-size: 1.6rem;
    color: ${props => props.theme.text};
    cursor: pointer;
    :hover {
        text-decoration: underline;
    }
`


const Form = props => {
    const { errors, touched, handleChange, values, handleBlur, setFieldValue, isSubmitting } = props
    const { currentPage :  text } = useSelector(state => state.text)

    const input = {
        id: "email",
        type: "email",
        name: "email",
        label: text.email,
        placeholder: text.email,
        input_type: "input",
    }

    return (
        <FormComponent>
            {renderInput({
                input,
                index: 0,
                errors,
                touched,
                handleChange,
                values,
                onBlur: handleBlur,
                onChange: setFieldValue
            })}
            {/* <Cta>
                <CtaItem onClick={() => props.history.push(`/${text.link_login}`)}>
                    {text.link_login}
                </CtaItem>
            </Cta> */}
            <ButtonContainer>
                {isSubmitting ? 
                    <Loader /> :
                    <Button type="submit">
                        {text.send_email}
                    </Button>
                }
            </ButtonContainer>
        </FormComponent>
    )
}



const EnhancedForm = withFormik({
    mapPropsToValues: () => {
        return {
            email: '',
        }
    },
    validationSchema: ({ text }) => {
        const empty = text.errors.required_field
        return Yup.object().shape({
            email: Yup.string().required(empty).email(text.errors.email_invalid)
         })
    },
    handleSubmit: async (values, {props}) => {
        const { sendEmailHandler } = props
        const res = await sendEmailHandler(values.email)
        console.log({
            res
        })
    }
})(Form)


const ForgotPassword = () => {
    const {
        text
    } = useSelector(state => state)

    const sendEmailHandler = email => {
        
    }   

    return (
        <Container>
            <Title>{text.currentPage.forgot_password}</Title>
            <EnhancedForm
                text={text}
                sendEmailHandler={sendEmailHandler}
            />
        </Container>
    )
}

export default ForgotPassword
