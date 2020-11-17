import React from 'react'
import { SignupForm } from '../Signup-style'
import { withFormik } from 'formik'
import { renderInput } from '../../../functions/form'
import { Button } from '../../../components'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Form = props => {
    const { errors, touched, handleChange, values, handleBlur, setFieldValue } = props
    const { currentPage: text } = useSelector(state => state.text)
    
    const inputs = [
        {
            id: "username",
            type: "text",
            name: "username",
            label: text.username,
            placeholder: text.username,
            input_type: "input"
        },
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
        <SignupForm>
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
            <Button type="submit" primary>
                {text.signup}
            </Button>
        </SignupForm>
    )
}

const EnhancedForm = withFormik({
    mapPropsToValues: props => {
        return {
            email: '',
            username: '',
            password: '',
        }
    },
    handleSubmit: async(values) => {
        try {
            const res = await axios({
                method: "post",
                url: "/signup",
                data: values
            })
            console.log('signup response', res)
        } catch(err){
            console.log("[SIGNUP ERROR]", err)
        }
    }
})(Form)

export default EnhancedForm