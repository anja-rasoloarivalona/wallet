import React, { useState, useEffect } from 'react'
import { Section, Title, Text, SetupForm, ButtonContainer, AssetsList, AssetItem} from '../Setup-style'
import { renderInput } from '../../../functions/form'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { Button, Card } from '../../../components'

const Form = props => {
    const { errors, touched, handleChange, values, handleBlur, setFieldValue, currentSection, assets, currency, changeSection, setErrors } = props
    const { currentPage : text } = useSelector(state => state.text)
    const { lang } = useSelector(state => state.settings)
    const [action, setAction] = useState("adding")

    useEffect(() => {
        if(assets.length > 0){
            setAction("viewing")
        }
    },[assets])

    useEffect(() => {
        if(Object.keys(errors).length > 0){
            setErrors({})
        }
    },[currentSection, errors])


    const inputs = [
        {
            id: "type",
            input_type: "select",
            name: "type",
            label: text.type,
            placeholder: text.type,
            options: [
                {value: "debit_card", label: text.debit_card},
                {value: "credit_card", label: text.credit_card},
                {value: "cash", label: text.cash}
            ]
        },
        {
            id: "name",
            input_type: "input",
            type: "text",
            placeholder: text.name,
            label: text.name,
            name: "name"
        },
        {
            id: "amount",
            input_type: "input",
            type: "number",
            placeholder: text.balance,
            label: text.balance,
            name: "amount",
            unit: currency ? currency.symbol : null
        }
    ]


    const assetForm = (
        <SetupForm>
            {inputs.map((input, index) => renderInput({
                input,
                index,
                errors,
                touched,
                handleChange,
                values,
                onBlur: handleBlur,
                onChange: setFieldValue
            }))}
            <ButtonContainer>
                {assets.length === 0 && <Button square="true" secondary="true" onClick={() => changeSection("next")}>{text.skip}</Button>}
                <Button square="true" type="submit">{text.add}</Button>
                {assets.length > 0 && action === "adding" &&  <Button square="true" secondary="true" onClick={() => setAction("viewing")}>{text.cancel}</Button>}
    
            </ButtonContainer>
        </SetupForm>
    )

    const assetsList = (
        <>
        <AssetsList>
            {assets.map((asset, index) => (
                <Card
                    card={asset}
                    key={index}
                />
            ))}
        </AssetsList>
        <ButtonContainer>
            <Button square="true" secondary="true" onClick={() => setAction("adding")}>{text.add}</Button>
            <Button square="true"  onClick={() => changeSection("next")}>{text.next}</Button>
        </ButtonContainer>
        </>
    ) 
    return (
        <Section
            currentSection={currentSection}
            active={1}
        >   
            <Text>{text.assets_text}</Text>
            {action === "viewing" && assetsList}
            {action === "adding" && assetForm}
        </Section>
    )
}

const Assets = withFormik({
    mapPropsToValues: () => {
        return {
            type: "",
            name: "",
            amount: ""
        }
    },
    validationSchema: ({ errorText }) => {
        const empty = errorText.required_field
        return Yup.object().shape({
            type: Yup.string().required(empty),
            name: Yup.string().required(empty),
            amount: Yup.string().required(empty)
        })
    },
    handleSubmit: (values, {props}) => {
        const { assets, setAssets} = props
        const updatedAssets = assets.map(asset => ( {...asset}))
        updatedAssets.push({
            ...values
        })
        setAssets(updatedAssets)
    }
})(Form)


export default Assets