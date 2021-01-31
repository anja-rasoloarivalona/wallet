import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { config } from '../config'

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

const Select = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    height: ${config.height};
    border-radius: ${config.border_radius};

    .select-category_icon {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        right: 12px;
        color: ${props => props.theme.form.unfocused.item_fill_color};
    }
`
const SelectValue = styled.div`
    height: 100%;
    width: 100%;
    padding-left: 10px;
    border-radius: ${config.border_radius};
    background: white;
    font-size: 1.4rem !important;
    display: flex;
    align-items: center;
    border: 1px solid ${props => props.theme.form.unfocused.border_color};

    color: ${props => props.placeholder ? props.theme.form.unfocused.label_color : 'initial'};

    ${props => {
        if(props.error){
            return {
                border: `1px solid ${props.theme.form.error_color}`
            }
        }
    }}

    svg {
        color: ${props => props.theme.form.unfocused.icon_fill_color};
        width: 10px;
    }

`
const MainList = styled.ul`
    position: absolute;
    top: calc(100% + 7px);
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
    list-style: none;
    padding: 0;
    border: ${props => props.showList ? '1px' : '0px'} solid ${props => props.theme.form.unfocused.border_color};
    transition: height .3s ease-in;
    height: ${props => props.showList ? 'unset' : '0px'};
    background: ${props => props.theme.form.background_color};
    border-radius: ${config.border_radius};
    box-shadow: ${props => props.theme.form.box_shadow};
    overflow-y: scroll;
    background: ${props => props.theme.form.background_color};
    z-index: 15;
    scrollbar-width: thin;

    ${props => {
        if(props.maxHeight){
            return {
                'maxHeight': props.maxHeight
            }
        }
    }}
`
const CategoryList = styled.li`
    width: 100%;
    margin: 0;
    padding: 0;
    border-bottom: 1px solid ${props => props.theme.form.unfocused.border_color};
    &:last-child {
        border-bottom: none !important;
    }

    * {
        font-size: ${config.font_size};
    }
`
const CategoryListItem = styled.div``

const CategoryListItemValue = styled.div`
    padding: 12px 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;

    :hover {
        background: ${props => props.theme.form.select.optionHoverBackground}; 
    }

    
    .select-category_icon {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        right: 12px;
        color: ${props => props.theme.form.unfocused.icon_fill_color}
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
        border-top: 1px solid ${props => props.theme.form.unfocused.border_color}
    }
    :hover {
        background: ${props => props.theme.form.select.optionHoverBackground};
    }
`

const CategoryLabel = props => {
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
                <Icon 
                    icon={labelData.icon}
                    size="1x"
                    color="white"
                />
            </IconContainer>
            <LabelText>{labelData.text}</LabelText>
        </LabelContainer>
    )
}




export  {
    CategoryLabel,
    Select,
    SelectValue,
    MainList,
    CategoryList,
    CategoryListItem,
    CategoryListItemValue,
    SubcategoryList,
    SubcategoryListItem

}
