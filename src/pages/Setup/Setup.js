import React, { useState, useEffect } from 'react'
import { Container, Content, Arrow, ArrowContainer } from './Setup-style'
import Currency from './sections/Currency'
import Assets from './sections/Assets'
import Budget from './sections/Budget'
import { useSelector, useDispatch } from 'react-redux'
import SideBar from './SideBar'
import * as actions from "../../store/actions" 
import { client } from '../../functions'
import _ from 'lodash'

const Setup = props => {
    const dispatch = useDispatch()
    const {
        text: { errors: errorText, currentPage: text } ,
        user: { assets, budgets },
        settings: { currency }
    } = useSelector(state => state)


    const [currentSection, setCurrentSection] = useState(0)
    const [submitting, setSubmitting] = useState(false)

    const initialSections = [
        {id: "currency", ref: currency, name: text.currency, action: "Choose", isValid: false, icon: "money-bill"},
        {id: "assets", ref: assets, name: text.assets, action: "Add", isValid: false, icon: "credit-card"},
        {id: "budgets", ref: budgets, name: text.budget, action: "Set", isValid: false, icon: "coins"},
    ]


    const [sections, setSections] = useState(initialSections)


    useEffect(() => {
        const updatedSections = sections.map(section => ({...section}))
        updatedSections[0].name = text.currency
        updatedSections[1].name = text.assets
        updatedSections[2].name = text.budget
        setSections(updatedSections)
    },[text])

    useEffect(() => {
        const updatedSections = sections.map(section => ({...section}))
        let shouldupdate = false
        updatedSections.forEach((section, index) => {
            if(!_.isEmpty(initialSections[index].ref) && !sections[index].isValid){
                updatedSections[index].isValid = true
                shouldupdate = true
            }
        })
        if(shouldupdate){
            setSections(updatedSections)
        }
    }, [currency, assets, budgets])



    const changeSection = direction => {
        if(direction === "previous" && currentSection > 0){
            setCurrentSection(prev => prev - 1)
        }
        if(direction === "next" && currentSection < 2){
            setCurrentSection(prev => prev + 1)
        }
    }

    const submitHandler = async () => {
        try {
            setSubmitting(true)
            let userAssets = []
            if(assets.length > 0){
                userAssets = assets
            } else {
                userAssets.push({
                    type: "cash",
                    amount: 0,
                    name: text.principal
                })
            }
            const res = await client.post("/setup/init", {
                currency,
                budget: budgets,
                assets: userAssets
            })

            const resData = res.data.data
            dispatch(actions.updateApp(resData))
            setSubmitting(false)
            props.history.push("/")

        } catch(err){
            setSubmitting(false)
            console.log(err.message)
        }
        
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
            <Content>
                {navigator()}
                <Currency 
                    currentSection={currentSection}
                    changeSection={changeSection}
                />
                {currency && currency.symbol && (
                    <>
                        <Assets 
                            currentSection={currentSection}
                            changeSection={changeSection}
                        />
                        <Budget 
                            currentSection={currentSection}
                            submitting={submitting}
                            submitHandler={submitHandler}
                        />
                    </>
                )}
            </Content>
        </Container>
    )
}

export default Setup
