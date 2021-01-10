import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChromePicker } from 'react-color';
import { useOnClickOutside } from '../../functions'

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 25.1rem;
    width: calc(100vw - 25.1rem);
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    background: ${props => props.theme.background};
    z-index: 99;
    // background: red;

    .chrome-picker {
        position: fixed;
        top: 3rem;
        right: 3rem;
    }
`

const Header = styled.div`
    width: 100%;
    height: 10rem;
    padding: 2rem;
    display: flex;
    align-items: center;
    background: ${props => props.theme.surface};
    border-bottom: 1px solid ${props => props.theme.text};
`

const Title = styled.div`
    font-size: 2.5rem;
    width: 100%;
`

const Content = styled.div`
    width: 100%;
    height: 100%;
    min-height: calc(100vh - 10rem);
    display: flex;
    justify-content: center;
    overflow: overlay;
    padding-top: 5rem;
    // background: green;
`

const Table = styled.div`
    background: ${props => props.theme.surface};
    width: 100%;
    max-width: 90rem;
    height: max-content;
    margin-bottom: 3rem;
    border-radius: .5rem;
    // padding-bottom: 2rem;
`

const TableHeader = styled.div`
    display: flex;
    align-items: center;
    padding: 2rem 0;
    border-bottom: 3px solid ${props => props.theme.text};
    color: ${props => props.theme.text};
    padding-left: 4rem;

    > div:nth-child(1){
        width: 60%;
      
    }
    > div:nth-child(2){
        width: 20%;
    }
    > div:nth-child(3){
        width: 20%;
    }
`

const TableHeaderItem= styled.div`
    font-size: 1.6rem;
`

const CategoryRow = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem 0;

    cursor: pointer;
     border-bottom: ${props => props.top ? `1px solid ${props.theme.text}` : "none"};
    :hover {
        background: grey;
    }

    

    > div:nth-child(1){
        width: 60%;    
        padding-left:  ${props => props.top ? `4rem` : "7rem"}  ;
    }
    > div:nth-child(2){
        width: 20%;
    }
    > div:nth-child(3){
        width: 20%;
    }
`

const CategoryRowItem = styled.div`
    font-size: 1.6rem;
    // background: blue;
`

const CategoryColor = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    background: ${props => props.background};
    border-radius: .5rem;
`

const CategoriesForm = () => {
    const dispatch = useDispatch()
    const {
        text : { currentPage : text },
        categories
    } = useSelector(state => state)

    const [showList, setShowList] = useState(false)
    const [updatedCategory, setUpatedCategory] = useState(false)
    const [color, setColor] = useState("")

    const ref = useRef()

    // useOnClickOutside(ref, () => setUpatedCategory(false))

    const data = {
        income: {
            ...categories.income
        },
        ...categories.expense
    }

    const showListHandler = value => {
        if(value === showList){
            setShowList(false)
        } else {
            setShowList(value)
        }
    }

    const renderCategory = (category, index) => {
        const background = Math.abs(index % 2) === 1;
        return (
            <>
            <CategoryRow top key={category.master_id} background={background} onClick={() => showListHandler(category.master_id)}>
                <CategoryRowItem>{category.master_name}</CategoryRowItem>
                <CategoryRowItem>
                    <FontAwesomeIcon 
                            icon={category.master_icon}
                            size="2x"
                            color={updatedCategory === category.master_id ? color : category.color}
                    />
                </CategoryRowItem>
                <CategoryRowItem>
                    <CategoryColor
                        background={updatedCategory === category.master_id ? color : category.color}
                        onClick={() => handleChangeStart(category.color, category.master_id)}
                    />
                </CategoryRowItem>
            </CategoryRow>
                {showList === category.master_id && Object.keys(category.children).map(subcategory => {
                        return (
                            <CategoryRow>
                                    <CategoryRowItem>{text[subcategory]}</CategoryRowItem>
                                    <CategoryRowItem>
                                        <FontAwesomeIcon 
                                            icon={category.children[subcategory].sub_icon}
                                            size="2x"
                                            color={updatedCategory === category.master_id ? color : category.color}
                                        />
                                    </CategoryRowItem>
          
                            </CategoryRow>
                        )
                })}
            </>
        )
    }

    const handleChangeComplete = (color) => {
        setColor(color.hex)
    };

    const handleChangeStart = (initColor, master_id) => {
        setColor(initColor)
        setUpatedCategory(master_id)
    }
    

    return (
        <Container>
                {updatedCategory && (
                    <ChromePicker 
                        color={color}
                        disableAlpha="true"
                        onChangeComplete={handleChangeComplete }
                        ref={ref}
                    />
                )}
                <Header>      
                    <Title>Categories manager</Title>
                </Header>
                <Content>
                    <Table>
                        <TableHeader>
                            <TableHeaderItem>Category</TableHeaderItem>
                            <TableHeaderItem>Icon</TableHeaderItem>
                            <TableHeaderItem>Color</TableHeaderItem>
                        </TableHeader>
                        {Object.keys(data).map((item, index) => renderCategory(data[item], index))}
                    </Table>
                </Content>

        
     
        </Container>
    )
}


export default CategoriesForm