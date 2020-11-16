import React from 'react'
import { SignupForm } from '../Signup-style'
import { withFormik } from 'formik'
import { renderInput } from '../../../functions/form'
import { Button } from '../../../components'
import axios from 'axios'

const Form = props => {
    const { errors, touched, handleChange, values, handleBlur, setFieldValue } = props
    
    const inputs = [
        {
            id: "username",
            type: "text",
            name: "username",
            label: "User name",
            placeholder: "User name",
            input_type: "input"
        },
        {   
            id: "email",
            type: "email",
            name: "email",
            label: "Email",
            placeholder: "Email",
            input_type: "input",
        },
        {   
            id: "password",
            type: "password",
            name: "password",
            label: "Password",
            placeholder: "Password",
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
                Signup
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