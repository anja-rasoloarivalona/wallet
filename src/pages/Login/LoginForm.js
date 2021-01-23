import React from 'react'
import { LoginForm, Title, Cta, CtaItem, ButtonContainer } from './Login-style'
import { withFormik } from 'formik'
import { renderInput } from '../../functions'
import * as Yup from 'yup'
import { Button, Loader } from '../../components'
import { useSelector } from 'react-redux'
import { RenderCheckBox } from '../../functions/form'
import { withRouter } from 'react-router-dom'


const Form = props => {

    const { errors, touched, handleChange, values, handleBlur, setFieldValue, isSubmitting, remember, setRemember } = props
    const { currentPage :  text } = useSelector(state => state.text)

    const inputs = [
        {   
            id: "email",
            type: "email",
            name: "email",
            label: text.email,
            placeholder: text.email,
            input_type: "input",
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


    return (
            <LoginForm>
                <Title>
                    {text.login}
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
                <Cta>
                    <CtaItem>
                       <RenderCheckBox 
                          label={text.remember_me}
                          isChecked={remember}
                          onChange={setRemember}
                       />
                
                    </CtaItem>
                    <CtaItem onClick={() => props.history.push(`/${text["link_forgot-password"]}`)}>
                        {text.forgot_password}
                    </CtaItem>
                </Cta>
                <ButtonContainer>
                    {isSubmitting ?
                        <Loader /> :
                        <Button type="submit" primary>
                            {text.login}
                        </Button>
                    }
                </ButtonContainer>
            </LoginForm>
    )
}

const EnhancedForm = withFormik({
    mapPropsToValues: () => {
        return {
            email: '',
            password: '',
        }
    },
    validationSchema: ({ text }) => {
        const empty = text.errors.required_field
        return Yup.object().shape({
            email: Yup.string().required(empty).email(text.errors.email_invalid),
            password: Yup.string().required(empty)
         })
    },
    handleSubmit: async (values, {props}) => {
        const { loginHandler } = props
        await loginHandler(values)
    }
})(withRouter(Form))


export default EnhancedForm
