import styled from 'styled-components'
import {Form } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const setPosition = (currentSection, active) => {
    if(currentSection === active){
        return {
            transform: "translateX(0)"
        }
    } else {
        if(currentSection > active){
            return {
                transform: "translateX(-100vw)"
            }
        } else {
            return {
                transform: "translateX(100vw)"
            }
        }
    }
}

const Container = styled.div`
    position: fixed;
    top: 5.4rem;
    left: 0;
    width: 100vw;
    z-index: 25;
    min-height: calc(100vh - 5.4rem);
    display: flex;
    justify-content: center;
    background: ${props => props.theme.surface};
`

const Content = styled.div`
    width: calc(100vw - 25rem);
    margin-left: 25rem;
    position: relative;
`

const Section = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: calc(100vh - 5.4rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all .3s ease-in;
    padding-top: 10vh;

    form {
        width: 40rem;
        margin-top: 2rem;
    };

    ${props => {
        return setPosition(props.currentSection, props.active)
    }}
`


const Title = styled.div`
    width: calc(100vw - 30rem);
    height: 7.6rem;
    border-bottom: 1px solid ${props => props.theme.text};
    color: ${props => props.theme.text};
    font-size: 3rem;
    font-weight: 500;
    position: fixed;
    top: 0rem;
    left: 30rem;
    background: white;
    display: flex;
    align-items: center;
    padding-left: 10rem;
    z-index: 3;
`
const Text = styled.div`
    font-size: 1.6rem;
    line-height: 1.4;
    text-align: center;
`

const SetupForm = styled(Form)`
    width: 40rem;
    margin-top: 2rem;

`

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 6rem;
    margin-top: 3rem;
`



const Arrow = styled(FontAwesomeIcon)`
`

const ArrowContainer = styled.div`
    display: ${props => props.active ? "flex" : "none"};
    align-items: center;
    justify-content: center;
    border: 1px solid grey;
    border-radius: 50%;
    padding: 1rem;
    position: absolute;
    top: 25vh;
    margin: auto;
    width: 7.5rem;
    height: 7.5rem;
    cursor: pointer;
    opacity: .6;
    z-index: 5;
    transition: all .3s ease-in;
    :hover {
        opacity: 1;
    }
    ${props => {
        if(props.left){
            return {
                left: "5rem"
            }
        }
        if(props.right){
            return {
                right: "5rem"
            }
        }
    }}
`

const AssetsList = styled.ul`
    width: 100%;
    list-style: none;
    margin: 4rem;
    display: grid;
    grid-template-columns: repeat(2, max-content);
    grid-template-rows: max-content;
    grid-auto-rows: max-content;
    row-gap: 2rem;
    column-gap: 2rem;
    justify-content: center;
`

export {
    Arrow,
    ArrowContainer,
    AssetsList,
    Container,
    Content,
    Section,
    Title,
    Text,
    SetupForm,
    ButtonContainer
}