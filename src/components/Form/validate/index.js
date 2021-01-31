import { Input } from './Input'
import { Select } from './Select'
import { DatePicker } from './DatePicker'
import { TextArea } from './TextArea'
import { CategoryInput } from '../custom/CategoryInput'

export const renderInput = props => {
    const inputType = props.input.input_type;
    switch(inputType){
        case "input":
            return <Input {...props} />
        case "textarea":
            return <TextArea {...props} />
        case "select":
            return <Select {...props}/>
        case "date":
            return <DatePicker {...props}/>
        case "category":
            return <CategoryInput {...props} />
        default: throw ("INPUT DOESN'T HAVE A VALID INPUT_TYPE VALUE")
    }
}

export {
    Input,
    Select,
    DatePicker,
    TextArea
}