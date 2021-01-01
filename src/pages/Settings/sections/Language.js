import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { Section, Title} from '../Settings-style'
import { Select, SelectValue, SelectList, SelectListItem } from '../../../functions/form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector , useDispatch } from 'react-redux'
import * as actions from '../../../store/actions'
import { useOnClickOutside } from '../../../functions'


const Language = () => {

    const dispatch = useDispatch()
    const [showList, setShowlist] = useState(false)
    const {
        settings: { lang },
        text: { currentPage : text}
    } = useSelector(state => state)

    const toggleLanguage = () => {
        const nextLang = lang === "fr" ? "en" : "fr"
        dispatch(actions.setLang(nextLang))
    }

    const ref = useRef()

    useOnClickOutside(ref, () => setShowlist(false))

    return (
        <Section showList={showList}>
            <Title>Language</Title>

            <Select onClick={() => setShowlist(prev => !prev)} ref={ref}>
                <SelectValue showList={showList}>
                    {text[lang]}
                    <FontAwesomeIcon 
                        icon="angle-down"
                        size="1x"
                        className="select-category_icon"
                    />
                </SelectValue>
                <SelectList showList={showList}>
                    <SelectListItem onClick={toggleLanguage}>
                        {lang === "fr" ? text.en: text.fr}
                    </SelectListItem>
                </SelectList>
            </Select>
            
        </Section>
    )
}

export default Language
