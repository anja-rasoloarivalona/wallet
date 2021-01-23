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
    width: 100vw;
    min-height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 25;
    display: flex;
    justify-content: center;
    padding-left: 30rem;
    background: ${props => props.theme.background};
`

const Content = styled.div`
    top: 7.5rem;
    position: relative;
    width: calc(100vw - 30rem);
    height: calc(100vh - 15rem);
    overflow-y: overlay;
    overflow-x: hidden;
`

const Section = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all .3s ease-in;
    padding-top: 10vh;
    // background: red;

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
    width: 50%;
    list-style: none;
    margin: 4rem;
    display: flex;
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