import React, { useState, useEffect } from 'react'
import { Container, Content, Title, Arrow, ArrowContainer } from './Setup-style'
import Currency from './sections/Currency'
import Assets from './sections/Assets'
import Budget from './sections/Budget'
import { useSelector, useDispatch } from 'react-redux'
import SideBar from './SideBar'
import * as actions from "../../store/actions" 
import { client } from '../../functions'

const Setup = () => {
    const dispatch = useDispatch()
    const { errors: errorText, currentPage: text } = useSelector(state => state.text)
    const [currentSection, setCurrentSection] = useState(0)
    const [submitting, setSubmitting] = useState(false)

    const [currency, setCurrency] = useState(null)
    const [assets, setAssets] = useState([])
    const [budget, setBudget] = useState([])

    const [sections, setSections] = useState([
        {name: text.currency, isValid: false},
        {name: text.assets, isValid: false},
        {name: text.budget, isValid: false},
    ])

    useEffect(() => {
        const updatedSections = sections.map(section => ({...section}))
        if(currency){
            dispatch(actions.setCurrency(currency))
            if(!sections[0].isValid){
                updatedSections[0].isValid = true
                setSections(updatedSections)
            }
        }
    }, [currency])

    const changeSection = direction => {
        if(direction === "previous" && currentSection > 0){
            setCurrentSection(prev => prev - 1)
        }
        if(direction === "next" && currentSection < 2){
            setCurrentSection(prev => prev + 1)
        }
    }

    const submitHandler = () => {
        setSubmitting(true)
        
    }

    const navigator = () => {
        return (
            <>
                <ArrowContainer left="true" onClick={() => changeSection("previous")} active={currentSection > 0}>
                    <Arrow 
                        icon="chevron-left"
                        size="2x"
                        color="grey"
                    />
                </ArrowContainer>
                <ArrowContainer right="true" onClick={() => changeSection("next")} active={currentSection < 2 && currency}>
                    <Arrow 
                        icon="chevron-right"
                        size="2x"
                        color="grey"
                    />
                </ArrowContainer>
            </>
        )
    }


    return (
        <Container>
            <SideBar 
                sections={sections}
                currentSection={currentSection}
            />
            <Title>
                {sections[currentSection].name}
            </Title>
            <Content>
                {navigator()}
                <Currency 
                    setCurrency={setCurrency}
                    currentSection={currentSection}
                    text={text}
                    errorText={errorText}
                    changeSection={changeSection}
                />
                {currency && (
                    <>
                        <Assets 
                            setAssets={setAssets}
                            assets={assets}
                            currentSection={currentSection}
                            currency={currency}
                            errorText={errorText}
                            changeSection={changeSection}
                        />
                        <Budget 
                            setBudget={setBudget}
                            budget={budget}
                            currentSection={currentSection}
                            currency={currency}
                            errorText={errorText}
                            submitting={submitting}
                        />
                    </>
                )}
            </Content>
        </Container>
    )
}

export default Setup
