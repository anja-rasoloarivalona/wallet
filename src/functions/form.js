import React, {useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Field } from 'formik'
import { useSelector } from 'react-redux'
import DatePicker from 'react-datepicker'
import ReactSelect from 'react-select'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useOnClickOutside } from './index'


export const Container = styled.div`
    position: relative;
    width: 100%;
    margin-top: 30px;
    caret-color: ${props => props.theme.clr_primary};

    * {
        box-sizing: border-box;
        font-size: 1.4rem;
    }

    .input_cta {
        position: absolute;
        right: 0;
        top: 100%;
        background: red;
    }

    .react-datepicker-wrapper, .react-datepicker__input-container , .react-datepicker__input-container > input {
        width: 100%;
        height: 100%;
        cursor: pointer;
    }

    .react-datepicker__input-container > input {
        border: 1px solid ${props => props.theme.grey_dark};
        padding: 12px 6px;
        :focus {
            outline: none;
        }
    }

    input::placeholder {
        color: ${props => props.theme.grey_dark};
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }

    ${props => {
        if(props.fullWidth){
            return {
                'grid-column':' 1 / -1'
            }
        }
    }}
`
export const Label = styled.label`
    position: absolute;
    left: 10px;
    top: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    align-items:center;
    color: ${props => props.theme.clr_text_semi_dark};
    transition: all .2s ease-in;
    opacity: 0;
    font-size: 1.4rem;


    ${props => {
        if(props.shown){
            return {
                'transform' : 'translateY(-33px) translateX(-10px)',
                'opacity' : '1'
            }
        }
        if(props.textarea){
            return {
                'bottom': 'unset',
                'margin': 'unset',
                'top': '10px'
            }
        }
    }}
`
export const LabelAction = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 12px;
    font-size: 1.4rem
    :hover {
        color: ${props => props.theme.clr_text_semi_dark};
    }
`

export const DateInput = styled(DatePicker)`
    border: 1px solid ${props => props.theme.grey_dark};
    border-radius: 4px;
`

export const Input = styled(Field)`
    height: 40px;
    width: 100%;
    padding-left: 10px;
    border-radius: 4px;
    font-size: 1.4rem;
    border: none;
    border-bottom: 1px solid transparent;

    ::placeholder {
        color: ${props => props.theme.clr_text_semi_dark};
    }

    :focus {
        outline: none;
        border-bottom: 1px solid ${props => props.theme.clr_primary};
    }
    :not(:placeholder-shown) + label {
        opacity: 1;
        transform: translateY(-33px) translateX(-10px);
    }
    :-webkit-autofill,
    :-webkit-autofill:hover, 
    :-webkit-autofill:focus, 
    :-webkit-autofill:active  {
    :-webkit-box-shadow: 0 0 0 30px white inset !important;
        background: white !important;

}
    ${props => {
        if(props.textarea){
            return {
                'resize': 'none',
                'height': '160px !important',
                'padding-top': '10px'
            }
        }
    }}
`
export const Select = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;
    height: 100%;
    height: 40px;

    .select-category_icon {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        right: 12px;
    }
`
export const SelectValue = styled.div`
    height: 100%;
    width: 100%;
    padding-left: 10px;
    color: ${props => props.placeholder ? props.theme.grey_dark : 'initial'};
    border-radius: 4px;
    background: white;
    font-size: 1.4rem !important;
    display: flex;
    align-items: center;

`
export const SelectList = styled.ul`
    position: absolute;
    top: calc(100% + 7px);
    left: 0;
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
    border: ${props => props.showList ? '1px' : '0px'} solid ${props => props.theme.grey_dark};
    transition: height .3s ease-in;
    height: ${props => props.showList ? 'unset' : '0px'};
    z-index: 14;
    background: ${props => props.theme.white};
    border-radius: 4px;
    box-shadow: 0px 6px 12px -5px rgba(83,83,97,1);

    ${props => {
        if(props.maxHeight){
            return {
                'maxHeight': props.maxHeight,
                'overflow': 'auto'
            }
        }
    }}
`
export const SelectListItem = styled.li`
    padding: 12px 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    cursor: pointer;
    :hover {
        background: ${props => props.theme.clr_primary};
        color: ${props => props.theme.white};
    }
`
export const InputUnit = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    color: ${props => props.theme.grey_dark};
`

export const Error = styled.div`
    position: absolute;
    top: calc(100% + 10px);
    font-size: 1.4rem;
    top: 0;
    transform: translateY(-20px);

    z-index: 13;
    color: ${props => props.theme.red};
`
export const ListContainer = styled.div`
    > div > div {
        border: none;
        :hover {
            border: none;
        }
    }
    > div > div:first-child > div:first-child {
        overflow: unset;
    }
    > div > div:first-child {
        z-index: 14;
    }
    > div > div:not(:first-child):last-child {
        z-index: 15;
    }
`

export const renderInput = (props) => {
    const inputType = props.input.input_type;
    switch(inputType){
        case "input":
            return  renderNormalInput(props);
        case "textarea":
            return renderTextArea(props);
        case "select":
            return RenderSelectInput(props);
        case  "date":
            return renderDatePicker(props);
        default: return renderNormalInput(props)
    }
}


const RenderSelectInput = props => {

    const {input, index, errors, touched, values } = props
    const theme = useSelector(state => state.theme)

    const handleChange = value => {
        props.onChange(input.name, value.value)
    }

    const handleBlur = () => {
        props.onBlur(input.name, true)
    }

    const borderStyle = `1px solid ${theme.grey_dark}`

    const style = {
        control: (provided, state) => ({
          ...provided,
          boxShadow: "none",
          height: "40px",
          border: state.isFocused ? borderStyle : borderStyle,
          cursor: 'pointer',
          '&:hover': {
            border: state.isFocused ? borderStyle : borderStyle,
          }
        }),
        placeholder: (provided) => ({
            ...provided,
            color: theme.grey_dark,
            fontSize: "1.4rem"
        }),
        menuList: (provided) => ({
            ...provided,
            paddingTop: 0,
            paddingBottom: 0,
            borderRadius: '4px',
            boxShadow: '0px 6px 12px -5px rgba(83,83,97,1)'
        }),
        option: (provided, state) => ({
            ...provided,
            fontSize: "1.4rem",
            backgroundColor: state.isSelected ? theme.clr_primary : theme.white,
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: state.isSelected ? theme.clr_primary : theme.white
            }
        })
      };

      

    return (
        <Container key={index} style={{...input.style}}>
             <Label htmlFor={input.id} shown={values[input.name] !== ''} style={{...input.labelStyle}}>
                {input.label}
            </Label>
            <ListContainer>
                <ReactSelect
                    id={input.id}
                    options={input.options}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    styles={style}
                    placeholder={input.placeholder}
                    // menuIsOpen={true}
                    isSearchable={input.isSearchable ? true : false}
                    value={input.options.filter(({value}) => value === values[input.name])}
                    // defaultValue={{...input.defaultValue}}
                    components={{
                        IndicatorSeparator: () => null
                    }}
                />
            </ListContainer>
            {touched[input.name] && errors[input.name] && (
                <Error>
                    {errors[input.name]} 
                </Error>
            )}
        </Container>
    )
}

export const renderNormalInput = props => {
    const {input, index, errors, touched} = props

    const clickHandler = () => {
        if(input.disabled && input.disabledHandler){
            input.disabledHandler()
        }
    }
    return (
        <Container key={index} style={{...input.style}} onClick={clickHandler}>
                <Input 
                    id={input.id}
                    type={input.type}
                    name={input.name}
                    placeholder={input.placeholder}
                    disabled={input.disabled}
                    style={{...input.fiedlStyle}}
                />
                {!errors[input.name] && (
                    <Label htmlFor={input.id} style={{...input.labelStyle}}>
                        {input.label}
                    </Label>
                )}
                {input.children && input.children()}
                {input.unit && (
                    <InputUnit>
                        {input.unit}
                    </InputUnit>
                )}
                {touched[input.name] && errors[input.name] && (
                    <Error>
                        {errors[input.name]} 
                    </Error>
                )}
        </Container>
    )
}

const renderTextArea = props => {
    const { input, index, touched, errors } = props
    return (
        <Container
            key={index}
            style={{...input.style}}
        >
            <Input 
                id={input.id}
                type={input.type}
                name={input.name}
                placeholder={input.placeholder}
                component="textarea"
                textarea
            />
            <Label htmlFor={input.id} textarea style={{...input.labelStyle}}>
                {input.label}
            </Label>
            {input.children && input.children()}
            {touched[input.name] && errors[input.name] && (
                    <Error>
                        {errors[input.name]} 
                    </Error>
            )}
        </Container>
    )
}

const renderDatePicker = props => {
    const { input, index, onChange, values, touched, errors } = props

    return (
        <Container
            key={index}
            style={{...input.style}}
        >   
            <DateInput 
                id={input.id}
                name={input.name}
                dateFormat={input.dateFormat}
                minDate={input.minDate ? input.minDate : null}
                maxDate={input.maxDate ? input.maxDate : null}
                showTimeInput={input.showTimeInput}
                selected={values[input.name]}
                onChange={date => onChange(input.name, date)}
                autoComplete="off"
                placeholderText={input.label}
            />
            <Label htmlFor={input.id} style={{...input.labelStyle}} shown={values[input.name] !== ''} >
                {input.label}
            </Label>
            {touched[input.name] && errors[input.name] && (
                    <Error>
                        {errors[input.name]} 
                    </Error>
            )}
        </Container>
    )
}



const CategoriesContainer = styled(Container)`
    @media (max-width: 590px){
        grid-column: 1 / -1;
    }
`

const ArrowIcon = styled(FontAwesomeIcon)`
    color: ${props => props.theme.clr_primary};
    width: 10px;
`


const CategoryList = styled.li`
    width: 100%;
    margin: 0;
    padding: 0;

    border-bottom: 1px solid ${props => props.theme.clr_primary};

    &:last-child {
        border-bottom: none !important;
    }

    * {
        font-size: 1.4rem;
    }
`
const CategoryListItem = styled.div`

`

const CategoryListItemValue = styled.div`
    padding: 12px 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;
    
    :hover {
        background: ${props => props.theme.clr_primary};
        color: white;
        .select-category_icon {
            color: white;
        }   
    }
    .select-category_icon {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        right: 12px;
    }
`

const SubcategoryList = styled.ul`
    list-style: none;
    height: ${props => props.displayed ? 'unset': '0px'};
    transition: height .3s ease-in;
    overflow: hidden;
    padding: 0px;
`

const SubcategoryListItem = styled.li`
    padding: 12px 6px;
    padding-left: 50px;
    cursor: pointer;
    ${props => {
        if(props.active){
            return {
                background: "red"
            }
        }
    }}
    &:first-child {
        border-top: 1px solid ${props => props.theme.clr_primary}
    }
    :hover {
        background: ${props => props.theme.clr_primary};
        color: ${props => props.theme.white};
    }
`

const DesignedList = styled(SelectList)`
    overflow-y: scroll;
    background: ${props => props.theme.white};
    z-index: 15;

    // ::-webkit-scrollbar {
    //     width: 8px;
    //     background-color: #F5F5F5;
    // }
    // ::-webkit-scrollbar-track {
    //     -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    //     box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    //     background-color: #F5F5F5;
    // }
    // ::-webkit-scrollbar-thumb {
    //     border-radius: 10px;
    //     -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    //     box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    //     background-color: rgb(185, 182, 181);
    // }
    // ::-webkit-scrollbar-thumb:hover {
    //     background-color: #555;
    // }
    scrollbar-width: thin;
`


const LabelContainer = styled.div`
    display: flex;
    align-items: center;
`

const LabelText = styled.div``

const IconContainer = styled.div`
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-right: 2rem;
    background: ${props => props.background};
`

export const renderLabel = (item, type, color) => {
    console.log("renderLabel", {
        item,
        type,
        color
    })
    const icon = type === "master" ? item.master_icon : item.sub_icon
    const text = type === "master" ? item.master_name : item.sub_name
    const background =  item.color ? item.color : color

    return (
        <LabelContainer>
            <IconContainer background={background}>
                <FontAwesomeIcon 
                    icon={icon}
                    size="1x"
                    color="white"
                />
            </IconContainer>
            <LabelText>{text}</LabelText>
        </LabelContainer>
    )
}


export const SelectCategory = props => {

    const {data : categories, values, errors, setFieldValue , touched} = props

    const [showCategoryList, setShowCategoryList] = useState(false)
    const [activeCategoriesList, setActiveCategoriesList] = useState([])
    const text = useSelector(state => state.text.currentPage)
    const inputRef = useRef()


    const categoryHandler = category => {
        if(activeCategoriesList === category){
                setActiveCategoriesList(null)
            } else {
                setActiveCategoriesList(category)
        }
    }

    const selectCategoryAndClose = (categoryName, data) => {
        setFieldValue("category", categoryName)
        setFieldValue("data", data)
        setActiveCategoriesList([])
        setShowCategoryList(false)
    }


    useOnClickOutside(inputRef, () => setShowCategoryList(false));

    const categoriesInput = () => (
        <CategoriesContainer>
            <Label htmlFor="category" shown={values.category !== ''}>{text.category}</Label>
            <Select
                id="category"
                ref={inputRef}
            >
                <SelectValue
                    placeholder={values.category === ''}
                    showList={showCategoryList}
                    onClick={() => setShowCategoryList(true)}
                >
                    {values.category === "" ? text.category : renderLabel({sub_icon: values.data.sub_icon, sub_name: values.data.sub_name}, "sub", values.data.color)}
                    <ArrowIcon
                        icon={faChevronDown}
                        showList={showCategoryList}
                        className="select-category_icon"
                    />
                </SelectValue>
                <DesignedList
                    showList={showCategoryList}
                    maxHeight={'320px'}
                >
                    {Object.keys(categories).map((category, index) => (
                        <CategoryList key={index}>
                            <CategoryListItem>
                                <CategoryListItemValue
                                    active={activeCategoriesList === category}
                                    onClick={() => categoryHandler(category)}
                                >   
                                    {renderLabel(categories[category], "master")}
                                    <ArrowIcon
                                        icon={faChevronDown}
                                        showList={activeCategoriesList === category}
                                        className="select-category_icon"
                                    />

                                </CategoryListItemValue>

                                <SubcategoryList displayed={activeCategoriesList === category}>
                                    {Object.keys(categories[category].children).map((sub, index) => {
                                            const subcategory = categories[category].children[sub]
                                            return (
                                                <SubcategoryListItem
                                                    key={index}
                                                    active={values.category === subcategory.sub_name}
                                                    onClick={() => selectCategoryAndClose(subcategory.sub_name, {
                                                        sub_id:  subcategory.sub_id,
                                                        master: category,
                                                        color: categories[category].color,
                                                        sub_name: subcategory.sub_name,
                                                        sub_icon: subcategory.sub_icon
                                                    })}
                                                >   
                                                    {renderLabel(subcategory, "sub", categories[category].color)}
                                                </SubcategoryListItem>
                                            )
                                        })}
                                </SubcategoryList>
                            </CategoryListItem>
                        </CategoryList>
                    ))}
                </DesignedList>
            </Select>
            {touched.category && errors.category && (
                <Error>
                    {errors.category}
                </Error>
            )}                        
        </CategoriesContainer>
    )

    return categories ? categoriesInput() : <div></div>
}