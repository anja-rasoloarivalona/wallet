import styled from 'styled-components'

const Button = styled.button`
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    font-size: 1.4rem;

    :focus {
        outline: none;
    }
    ${props => {
        if(props.primary){
            return {
                background: props.theme.primary,
                color: props.theme.white
            }
        }
    }}
`

export {
    Button
}