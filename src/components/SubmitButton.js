import React from 'react'
import styled from 'styled-components'
import { Button } from './Button'
import { Loader } from './Loader'

const Container = styled.div`
    width: 100%;
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`

const SubmitButton = props => {
    const { isSubmitting, label, onClick } = props
    return (
        <Container>
            {isSubmitting ?
                <Loader /> :
                <Button onClick={onClick} type="submit">
                    {label}
                </Button>
            }
        </Container>
    )
}


export {
    SubmitButton
}