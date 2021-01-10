import React from 'react'
import { Section, Title} from '../../Settings-style'
import { useSelector , useDispatch } from 'react-redux'
import * as actions from '../../../../store/actions'
import { SelectInput } from '../../../../functions/form'

const Language = () => {
    const dispatch = useDispatch()
    const {
        settings: { lang },
        text: { currentPage : text}
    } = useSelector(state => state)

    const toggleLanguage = lang => {
        dispatch(actions.setLang(lang.value))
    }

    const options = [
        {label: text.fr, value: "fr"},
        {label: text.en, value: "en"}
    ]

    return (
        <Section >
            <Title>Language</Title>
            <SelectInput 
                id="lang"
                options={options}
                onChange={toggleLanguage}
                placeholder="Language"
                currentValue={lang}
            />            
        </Section>
    )
}

export default Language
