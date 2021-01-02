import React, { useState, useEffect }  from 'react'
import { renderInput } from '../../functions/form'
import { withFormik } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Content, Top, TopText, FormComponent, ButtonContainer, LoaderContainer, LoaderText } from '../Form-Style'
import * as Yup from 'yup'
import * as actions from '../../store/actions'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Loader } from '../../components'
import { client } from '../../functions'


const AssetForm = props => {
    const { errors, touched, handleChange, values, handleBlur, setValues, setFieldValue, isSubmitting } = props
    const dispatch = useDispatch()
    const [mounted, setMounted] = useState(false)
    const {
        text : { currentPage : text },
        settings: { lang, currency },
        ui: { assetForm }
    } = useSelector(state => state)

    useEffect(() => {
        setTimeout(() => {
            setMounted(true)
        }, 0)
        return () => {
            setMounted(false)
        }
    },[])

    useEffect(() => {
        if(assetForm.isOpened && assetForm.edited){
            const { amount, name, id, type } = assetForm.edited
            const data = {
                name,
                amount,
                id,
                type
            }
            setValues(data)
        }
    },[])


    let inputs = [
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
            ],
            disabled: assetForm.edited ? true : false
        },
        {
            id: "name",
            input_type: "input",
            type: "text",
            placeholder: text.name,
            label: text.name,
            name: "name",
        },
        {
            id: "amount",
            input_type: "input",
            type: "number",
            placeholder: text.amount,
            label: text.amount,
            name: "amount",
            unit: currency.symbol
        },
    ]

    // if(!assetForm.edited){
    //     inputs = [
    //         {
    //             id: "type",
    //             input_type: "select",
    //             name: "type",
    //             label: text.type,
    //             placeholder: text.type,
    //             options: [
    //                 {value: "debit_card", label: text.debit_card},
    //                 {value: "credit_card", label: text.credit_card},
    //                 {value: "cash", label: text.cash}
    //             ]
    //         },
    //         ...inputs
    //     ]
    // }


    
    return (
        <Container>
            <Content mounted={mounted}>
                <Top>
                    <FontAwesomeIcon 
                        icon="times-circle"
                        size="3x"
                        onClick={() => dispatch(actions.toggleForm({ form: "assetForm"}))}
                    />
                    <TopText>{text.asset}</TopText>
                </Top>
                <FormComponent>
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
                        {!isSubmitting ? 
                            <Button square="true" type="submit">{assetForm.edited ? text.edit : text.add}</Button>
                            :   
                            <LoaderContainer>
                                <Loader size="medium"/>
                                <LoaderText>{assetForm.edited ? text.asset_editing : text.asset_adding}</LoaderText>
                            </LoaderContainer>
                        }
                    </ButtonContainer>
                </FormComponent>
            </Content>
            
        </Container>
    )
}

const Asset = withFormik({
    mapPropsToValues: () => {
        return {
            id: "",
            name: "",
            amount: "",
            type: ""
        }
    },
    validationSchema: ({ errorText }) => {
        const empty = errorText.required_field
        return Yup.object().shape({
            name: Yup.string().required(empty),
            type: Yup.string().required(empty),
            amount: Yup.number().required(empty),
        })
    },
    handleSubmit: async (values, { props }) => {
        const { submitFormHandler} = props
        const { name, amount, id, type} = values
        try {
            
            const method = id ? "put" : "post"
            const data = {
                name,
                amount,
                id,
                type
            }
            const res = await client({
                method: method,
                url: "/asset",
                data
            })
            const resData = res.data.data
            submitFormHandler(resData, "assetForm")
        } catch(err){
            console.log(err)
        }

        
    }
})(AssetForm)

export default Asset
