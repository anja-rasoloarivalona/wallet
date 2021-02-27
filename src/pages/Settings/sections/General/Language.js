import React from 'react'
import { Section, Title} from '../../Settings-style'
import { useSelector , useDispatch } from 'react-redux'
import * as actions from '../../../../store/actions'
import { Select } from '../../../../components/form/unvalidate'

const Language = () => {
    const dispatch = useDispatch()
    const {
        settings: { lang },
        text: { currentPage : text}
    } = useSelector(state => state)

    const toggleLanguage = lang => {
        dispatch(actions.setLang(lang))
    }

    const options = [
        {label: text.fr, value: "fr"},
        {label: text.en, value: "en"}
    ]

    return (
        <Section >
            <Title>Language</Title>
            <Select 
                input={{
                    id: "lang",
                    options,
                    isSearchable: false,
                }}
                currentValue={lang}
                onChange={toggleLanguage}
            />
        </Section>
    )
}

export default Language
