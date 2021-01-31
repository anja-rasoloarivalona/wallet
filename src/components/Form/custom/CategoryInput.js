import React, { useState, useRef } from 'react'
import { Container, Label, Error } from '../style'
import { CategoryLabel, Select, SelectValue, MainList, CategoryList, CategoryListItem, CategoryListItemValue, SubcategoryList, SubcategoryListItem   } from './CategoryInput-style'
import { useOnClickOutside } from '../../../functions'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

const CategoryInput = props  => {

    const {input : { categories }, values, errors, onChange , touched } = props

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
        onChange("category", categoryName)
        onChange("data", data)
        setActiveCategoriesList([])
        setShowCategoryList(false)
    }

    useOnClickOutside(inputRef, () => setShowCategoryList(false));

    if(!categories){
        return <div></div>
    }

    return (
        <Container>
            <Label htmlFor="category" shown={values.category !== ""}>
                {text.category} {`\u002A`} 
            </Label>
            <Select id="category" ref={inputRef}>
                <SelectValue 
                    placeholder={values.category === ""}
                    showList={showCategoryList}
                    onClick={() => setShowCategoryList(true)}
                    error={touched.category && errors.category}
                >
                    {values.category === "" ? 
                       `${text.category} \u002A` :
                        <CategoryLabel item={values.data} type="sub" />
                    }
                    <Icon icon="chevron-down"  className="select-category_icon"/>
                </SelectValue>
                <MainList showList={showCategoryList} maxHeight="320px">
                {Object.keys(categories).map((category, index) => (
                    <CategoryList key={index}>
                        <CategoryListItem>
                            <CategoryListItemValue
                                active={activeCategoriesList === category}
                                onClick={() => categoryHandler(category)}
                            >   
                                <CategoryLabel
                                    item={{ master_name: categories[category].master}} 
                                    type="master"
                                />
                                <Icon
                                    icon="chevron-down"
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
                                                    <CategoryLabel
                                                        item={{ master_name:  categories[category].master, sub_name: sub}}
                                                        type="sub"
                                                    />
                                                </SubcategoryListItem>
                                            )
                                        })}
                            </SubcategoryList>
                        </CategoryListItem>
                    </CategoryList>
                    ))}
                </MainList>
            </Select>
            {touched.category && errors.category && (
                <Error>
                    {errors.category}
                </Error>
            )}  
        </Container>
    )
}

export {
    CategoryInput
}
