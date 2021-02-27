import React from 'react'
import { Container, Label, AppInput } from '../style'

const Input = props => {

    const { id, placeholder, value, onChangeHandler, label } = props

    return (
        // <Container key={id}>
        //     <AppInput 
        //         value={value}
        //         onChange={e => onChange(e.target.value)}
        //         placeholder={placeholder}
        //     />
        //     {label && (
        //         <Label htmlFor={id}>
        //             {label}
        //         </Label>
        //     )}
        // </Container>
        <AppInput 
            value={value}
            onChange={e => onChangeHandler(e.target.value)}
            placeholder={placeholder}
            {...props}
        />
    )
}

export {
    Input
}