import React, {useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Field } from 'formik'
import { useSelector } from 'react-redux'
import DatePicker, { registerLocale } from 'react-datepicker'
import ReactSelect, { components } from 'react-select'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useOnClickOutside } from './index'
import "react-datepicker/dist/react-datepicker.css"
import {
    Container, Label, LabelAction, DateInput, Input, Select, SelectValue, SelectList, SelectListItem, InputUnit, Error, ListContainer, CheckContainer, CheckBox, CheckMark, CheckLabel
} from './form-style'
import en from 'date-fns/locale/en-US'
import fr from 'date-fns/locale/fr-CA'
registerLocale('en', en)
registerLocale('fr', fr)

export {
    Container, Label, LabelAction, DateInput, Input, Select, SelectValue, SelectList, SelectListItem, InputUnit, Error, ListContainer
} from './form-style'



export const renderInput = (props) => {
    const inputType = props.input.input_type;
    switch(inputType){
        case "input":
            return <RenderNormalInput {...props} />;
        case "textarea":
            return <RenderTextArea {...props } />;
        case "select":
            return <RenderSelectInput {...props} />;
        case  "date":
            return <RenderDatePicker {...props} />;
        default: return <RenderNormalInput {...props}  />
    }
}


export const RenderCheckBox = props => {

    const {  label, isChecked, onChange } = props 

    return (
        <CheckContainer onClick={() => onChange(!isChecked)}>
            <CheckBox>
                {isChecked && <CheckMark icon="check" size="xs" />}
            </CheckBox>
            <CheckLabel>{label}</CheckLabel>
        </CheckContainer>
    )
}

const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <FontAwesomeIcon 
            icon="angle-down"
            size="1x"
            className="select-category_icon"
        />
      </components.DropdownIndicator>
    );
};

const selectStyle = theme => {
    const borderStyle = `1px solid ${theme.grey_dark}`
    return {
        control: (provided, state) => ({
          ...provided,
          boxShadow: "none",
          height: "40px",
          border: state.isFocused ? borderStyle : borderStyle,
          backgroundColor: theme.surface,
          cursor: 'pointer',
          '&:hover': {
            border: state.isFocused ? borderStyle : borderStyle,
          },
          '& svg': {
              color: theme.text
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
            boxShadow: theme.box_shadow,
            backgroundColor: theme.background,
        }),
        option: (provided, state) => ({
            ...provided,
            fontSize: "1.4rem",
            color: theme.text,
            backgroundColor: state.isSelected ? 'white' : theme.background,
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: theme.active_text
            }
        })
      }
} ;

export const SelectInput = props => {
    const { id, options, onChange, placeholder, currentValue, isSearchable } = props
    const {
        theme 
    } = useSelector(state => state)
    return (
        <Container>
            <ListContainer>
                <ReactSelect 
                    id={id}
                    options={options}
                    onChange={onChange}
                    isSearchable={isSearchable}
                    styles={selectStyle(theme)}
                    placeholder={placeholder}
                    value={options.filter(({value}) => value === currentValue)}
                    components={{
                        IndicatorSeparator: () => null,
                        DropdownIndicator
                    }}
                />
            </ListContainer>
        </Container>
    )
}


const RenderSelectInput = props => {
    const {input, index, errors, touched, values, disabled } = props
    const theme = useSelector(state => state.theme)
    const handleChange = value => {
        props.onChange(input.name, value.value)
    }
    const handleBlur = () => {
        props.onBlur(input.name, true)
    }
    // const borderStyle = `1px solid ${theme.grey_dark}`

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
                    styles={selectStyle(theme)}
                    placeholder={input.placeholder}
                    isDisabled={input.disabled}
                    isSearchable={input.isSearchable ? true : false}
                    value={input.options.filter(({value}) => value === values[input.name])}
                    components={{
                        IndicatorSeparator: () => null,
                        DropdownIndicator
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

export const RenderNormalInput = props => {

    const {input, index, errors, touched, values } = props

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
                    <Label htmlFor={input.id} style={{...input.labelStyle}}  shown={values[input.name] !== ''}>
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

const RenderTextArea = props => {
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

const RenderDatePicker = props => {
    const { input, index, onChange, values, touched, errors } = props
    const { settings: { lang } } = useSelector(state => state)
    const format = lang === "fr" ? "dd-MM-yyyy" : "MM-dd-yyyy"

    return (
        <Container
            key={index}
            style={{...input.style}}
        >   
            <DateInput 
                dateFormat={format}
                id={input.id}
                name={input.name}
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

export const RenderLabel  = props => {
    const {
        categories,
        text : { currentPage : text }
    } = useSelector(state => state)

    const { item, type } = props


    const labelData = {
        icon: "",
        text: "",
        color: ""
    }

  
    if(item.master_name === "income"){
        labelData.color = categories.income.color
            if(type === "master"){
                labelData.icon = categories.income.master_icon
                labelData.text = text[item.master_name]
            } else {
                labelData.icon = categories.income.children[item.sub_name].sub_icon
                labelData.text = text[item.sub_name]
            }
    } else {
        labelData.color = categories.expense[item.master_name].color
            if(type === "master"){
                labelData.icon = categories.expense[item.master_name].master_icon
                labelData.text = text[item.master_name]
            } else {
                labelData.icon = categories.expense[item.master_name].children[item.sub_name].sub_icon
                labelData.text = text[item.sub_name]
            }
    }
   
    return (
        <LabelContainer>
            <IconContainer background={labelData.color}>
                <FontAwesomeIcon 
                    icon={labelData.icon}
                    size="1x"
                    color="white"
                />
            </IconContainer>
            <LabelText>{labelData.text}</LabelText>
        </LabelContainer>
    )
}

export const renderLabel = (item, type, color) => {
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
                    {values.category === "" ? text.category :
                        <RenderLabel 
                            item={values.data}
                            type="sub"
                        />
                    }
                   
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
                                                    key={subcategory.sub_id}
                                                    active={values.category === subcategory.sub_name}
                                                    onClick={() => selectCategoryAndClose(subcategory.sub_name, {
                                                            sub_name: sub,
                                                            master_name:  categories[category].master,
                                                            sub_id: subcategory.sub_id,
                                                            type: categories[category].type
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