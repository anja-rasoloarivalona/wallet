import React, { useState, useRef } from 'react'
import {SectionContainer,  Section, Title, TextContainer, Text} from '../../Settings-style'
import { useSelector  } from 'react-redux'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useOnClickOutside } from '../../../../functions'
import { ChromePicker } from 'react-color';
import { fas } from '@fortawesome/free-solid-svg-icons'



let iconsLibrary  = []
Object.keys(fas).forEach(icon => {
    iconsLibrary.push(fas[icon].iconName)
})
iconsLibrary = iconsLibrary.filter( i => i !== "font-awesome-logo-full")

console.log({ iconsLibrary})



const List = styled.ul`
    list-style: none;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: max-content;
    grid-auto-rows: max-content;
    column-gap: 2rem;
    row-gap: 4rem;
    padding-top: 4rem;


    * {
        box-sizing: border-box;
    }
`

const Category = styled.div`
    display: flex;
    align-items: center;
    background: ${props => props.theme.surface};
    padding: 1rem 2rem;
    max-width: 42rem;
    border-radius: 4px;
    font-size: 1.6rem;
    cursor: pointer;
    position: relative;
`

const CategoryColor = styled.div`
    width: 2.3rem;
    height: 2.3rem;
    border-radius: 3px;
    background: ${props => props.background};
    margin-right: 2rem;
`

const CategoryText = styled.div`
    flex: 1;
`

const CategoryIconContainer = styled.div`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background: ${props => props.background};
    display: flex;
    align-items: center;
    justify-content: center;
`

const CategoryIcon = styled(FontAwesomeIcon)``


const TogglerContainer = styled.div`
    width: 2rem;
    display: flex;
    justify-content: center;
    margin-left: 4rem;
`

const Toggler = styled(FontAwesomeIcon)`
    cursor: pointer;

    :hover {
        color: ${props => props.theme.active_text}
    }
`

const SubList = styled.ul`
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    z-index: 2;
    background: ${props => props.theme.surface};
    list-style: none;
    padding-bottom: 2rem;
    box-shadow: ${props => props.theme.box_shadow};
`

const SubListItem = styled.li`
    padding: 1rem 2rem;
    display: flex;
    align-items: center;

    > div:first-child {
        width: 2.3rem;
        height: 2.3rem;
        margin-right: 2rem;
    }

    > div:last-child {
        width: 2rem;
        margin-left: 4rem;
    }
`

const SubListItemText = styled.div`
    flex: 1;
`

const Spacer = styled.div`
    background: ${props => props.theme.background};
    width: 100%;
    height: 10rem;
`

const ColorPickerContainer = styled.div`
    position: fixed;
    left: 1.5rem;
    top: 7rem;
    z-index: 45;
`

const IconsList = styled.div`
    position: fixed;
    z-index: 30;
    left: 5rem;
    top: 50vh;
    width: 50rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, 4rem);
    grid-template-rows: 4rem;
    grid-auto-rows: 4rem;
    height: 30rem;
    overflow-y: scroll;
    background: ${props => props.theme.surface};
    box-shadow: ${props => props.theme.box_shadow};
`

const IconContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    :hover {
        background: ${props => props.theme.active_text};
        
        svg {
            color: ${props => props.theme.surface}
        }
    }
`

const IconsListItem = styled(FontAwesomeIcon)`

`


const IconSelector = () => {
    return (
        <IconsList>
            {iconsLibrary.map(icon => (
                <IconContainer key={icon}>
                    <IconsListItem 
                        icon={icon}
                        size="2x"
                    />
                </IconContainer>
    
            ))}
        </IconsList>
    )
}


const Categories = () => {
    const {
        text: { currentPage : text},
        categories: data
    } = useSelector(state => state)

    const [ showList, setShowList ] = useState(null)
    const [ showColorPicker, setShowColorPicker ] = useState(null)


    const [ categories, setCategories ] = useState({
        income: {
            ...data.income
        },
            ...data.expense
        }
    )

    console.log(categories)

    const ref = useRef()
    console.log("ref", ref.current)
    useOnClickOutside(ref, () => setShowList(null))


   const renderCategory = category => {
        const renderSubCategory = subcat => {
            return (
                <SubListItem key={subcat.sub_id}>
                    <div></div>
                    <SubListItemText>{subcat.sub_name}</SubListItemText>
                    <CategoryIconContainer
                        background={showColorPicker && showColorPicker.master_id ===  category.master_id  ? showColorPicker.color :  category.color}
                    >
                        <CategoryIcon 
                            icon={subcat.sub_icon}
                            size="1x"
                            color="white"
                        />
                    </CategoryIconContainer>
                    <div></div>
                </SubListItem>
            )
        }

        const clickListHandler = id => {

            if(!showList){
                return setShowList(id)
            }

            if(showList && showList === id){
                return setShowList(null)
            }
            if(showList && showList !== id){
                return setShowList(id)
            }

           


        }

        const clickColorHandler = category => {
                setShowColorPicker(category)
        }

        const changeColorComplete = color => {
            setShowColorPicker(prev => ({
                ...prev,
                color: color.hex
            }))
        }

       return (
           <Category key={category.master_id} >
               <CategoryColor  
                    background={showColorPicker && showColorPicker.master_id ===  category.master_id  ? showColorPicker.color :  category.color}
                    onClick={() => clickColorHandler(category)}
               />
               {showColorPicker && showColorPicker.master_id === category.master_id && (
                    <ColorPickerContainer>
                        <ChromePicker 
                            color={showColorPicker.color}
                            disableAlpha="true"
                            onChangeComplete={changeColorComplete}
                        />
                </ColorPickerContainer>
               )}

               <CategoryText>{category.master_name}</CategoryText>
               <CategoryIconContainer
                     background={showColorPicker && showColorPicker.master_id ===  category.master_id  ? showColorPicker.color :  category.color}
               >
                   <CategoryIcon 
                        icon={category.master_icon}
                        size="1x"
                        color="white"
                   />
               </CategoryIconContainer>
               <TogglerContainer>
                <Toggler
                        icon="angle-down"
                        size="lg"
                        onClick={() => clickListHandler(category.master_id)}
                />
               </TogglerContainer>

               {showList === category.master_id && (
                    <SubList ref={ref}>
                        {Object.keys(category.children).map( subcat => renderSubCategory(category.children[subcat]))}
                        {/* <Spacer /> */}
                    </SubList>
               )}
           </Category>
       )
   }
    
    return (
        <SectionContainer>
                <Title>Categories</Title>
                <TextContainer>
                    <Text>{text.currency_text_a}</Text>
                    <Text>{text.currency_text_b}</Text>
                </TextContainer>
                <IconSelector />
                <List>
                    {Object.keys(categories).map( category => renderCategory(categories[category]))}
                </List>
        </SectionContainer>

    )
}

export default Categories
