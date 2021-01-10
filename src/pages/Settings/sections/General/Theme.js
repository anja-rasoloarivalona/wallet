import React from 'react'
import { Section, Title} from '../../Settings-style'
import { useSelector , useDispatch } from 'react-redux'
import * as actions from '../../../../store/actions'
import { SelectInput } from '../../../../functions/form'

const Theme = () => {
    const dispatch = useDispatch()
    const {
        settings: { theme },
        text: { currentPage : text}
    } = useSelector(state => state)

    const toggleTheme = theme => {
        dispatch(actions.updateTheme(theme.value))
    }

    const options = [
        {label: text.light, value: "light"},
        {label: text.dark, value: "dark"}
    ]

    return (
        <Section >
            <Title>Theme</Title>
            <SelectInput 
                id="theme"
                options={options}
                onChange={toggleTheme}
                placeholder="Theme"
                currentValue={theme}
            />            
        </Section>
    )
}

export default Theme
