import React from 'react'
import { Container, Label, AppInput } from '../style'

const Input = props => {

    const { id, placeholder, value, onChange, label } = props

    return (
        <Container key={id}>
            <AppInput 
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
            />
            {label && (
                <Label htmlFor={id}>
                    {label}
                </Label>
            )}
        </Container>
    )
}

export {
    Input
}