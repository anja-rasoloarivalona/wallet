import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../../store/actions'
import styled from 'styled-components'


const List = styled.ul`
    position: absolute;
    top: 100%;
    right: 0;
    width: 30rem;
    height: min-content;
    background: ${props => props.theme.surface};
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px ;
    list-style: none;

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
        <List>
            {ctaDta.map((action, index) => (
                <Item
                    key={index}
                    onClick={() => actionHandler(action)}
                >
                    {action.label}
                </Item>
            ))}
        </List> 
    )
}

export default ActionDropdown