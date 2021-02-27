import React from 'react'
import { Section, Title} from '../../Settings-style'
import { useSelector , useDispatch } from 'react-redux'
import * as actions from '../../../../store/actions'
import { Select } from '../../../../components/Form/unvalidate'

const Theme = () => {
    const dispatch = useDispatch()
    const {
        settings: { theme },
        text: { currentPage : text}
    } = useSelector(state => state)

    const toggleTheme = theme => {
        dispatch(actions.updateTheme(theme))
    }

    const options = [
        {label: text.light, value: "light"},
        {label: text.dark, value: "dark"}
    ]

    return (
        <Section >
            <Title>Theme</Title>
            <Select
                input={{
                    id:"theme",
                    options,
                    isSearchable: false
                }}
                onChange={toggleTheme}
                currentValue={theme}
            />            
        </Section>
    )
}

export default Theme
