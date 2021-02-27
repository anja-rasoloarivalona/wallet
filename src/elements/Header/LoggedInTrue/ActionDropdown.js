import React, { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../../store/actions'
import styled from 'styled-components'
import { IconContainer } from '../Header-style'
import { useOnClickOutside } from "../../../functions";

const Container = styled.div`
    position: relative;
    cursor: pointer;
    margin-left: 2rem;
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-left: 2rem;
`

const List = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    width: 37rem;
    height: min-content;
    background: ${(props) => props.theme.surface};
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px;
    padding: 2rem 0;
    display:  ${props => props.show ? "block" : "none"};
    z-index: 1;

`


const Item = styled.li`
    display: flex;
    align-items: center;
    padding: 1.5rem 2rem;
    border-radius: 5px;
    position: relative;


    :hover {
        background: ${props => props.theme.form.select.optionHoverBackground};
    }

`



const ActionDropdown = () => {

    const dispatch = useDispatch()

    const [showList, setShowList] = useState(false)

    const container = useRef()

    
  const onClickOutsideHandler = () => {
    if(showList){
        setShowList(false)
    }
    }

useOnClickOutside(container, () => onClickOutsideHandler())


    const {
        text: { currentPage: text}
    } = useSelector(state => state)

    const ctaDta = [
        {label: text.add_transaction, form: "transactionForm", type: "form"},
        {label: text.add_asset, form: "assetForm", "type": "form"},
        {label: text.add_budget, form: "budgetForm", type: "form"},
        {label: "Manage dashboard"},
    ]

    const actionHandler = action => {
        const { type, form} = action
        if(type === "form"){
            dispatch(actions.toggleForm({ form }))
        } else {
            dispatch(actions.toggleDashboard("edut"))
        }
    }


    return (
        <Container>
            <IconContainer onClick={() => setShowList(prev => !prev)}>
                <FontAwesomeIcon icon="plus" size="lg" />
            </IconContainer>
            <List
                show={showList}
                ref={container}
            >
                {ctaDta.map((action, index) => (
                    <Item
                        key={index}
                        onClick={() => actionHandler(action)}
                    >
                        {action.label}
                    </Item>
                ))}
            </List> 
        </Container>

    )
}

export default ActionDropdown