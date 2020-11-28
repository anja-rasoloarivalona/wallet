import styled, { keyframes } from 'styled-components'

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}`


const Loader = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 6rem;
    height: 6rem;
    animation: ${spin} 2s linear infinite;

    ${props => {
      if(props.size = "large"){
        return {
          width: "10rem",
          height: "10rem"
        }
      }
    }}
`


export  {
  Loader
}