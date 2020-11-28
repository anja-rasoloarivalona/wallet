import styled from 'styled-components'

const Button = styled.button`
    height: 4.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    font-size: 1.4rem;
    min-width: 14rem;
    margin: 0 .5rem;
    :focus {
        outline: none;
    }
`

export {
    Button
}