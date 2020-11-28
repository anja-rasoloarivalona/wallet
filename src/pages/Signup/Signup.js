import React, { useState, useEffect } from 'react'
import { Container, Disclaimer } from './Signup-style'
import Form from './sections/Form'
import EmailSent from './sections/EmailSent'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import axios from 'axios'


const Signup = () => {
    const dispatch = useDispatch()
    const [currentSection, setCurrentSection] = useState('form')
    const [submitting, setSubmitting] = useState(false)
    const [usedEmails, setUsedEmails] = useState([])
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const { setError } = actions
    const errorText = useSelector(state => state.text.errors.signup_failed)

    const sections = {
        form: Form,
        emailSent: EmailSent
    }
    const CurrentSection = sections[currentSection]

    const signupHandler = async data => {
        if(usedEmails.includes(data.email)) return
        setSubmitting(true)
        try {
            const res = await axios({
                method: "post",
                url: "/signup",
                data: data
            })
            setSubmitting(false)
            if(res.status === 201){
                setUser(data)
                setCurrentSection('emailSent')
                return 
            }
            return dispatch(setError({error: errorText})) 
        } catch(error){
            const { response : { data : { message }  } } = error
            setSubmitting(false)
            if(message === "email_taken"){
                setUsedEmails(prev => [...prev, data.email])
            } else {
                dispatch(setError({error: message}))
            }
        }
    }

    return (
        <Container>
            <CurrentSection 
                user={user}
                signupHandler={signupHandler}
                submitting={submitting}
                usedEmails={usedEmails}
            />
            {currentSection !== "emailSent" && (
                <Disclaimer>
                    By clicking "Sign up", your are creating a Monefy account, and you agree to Monefy's Terms of Use and Privacy Policy
                </Disclaimer>
            )}
        </Container>
    )
}

export default Signup
