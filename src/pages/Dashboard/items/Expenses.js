import React from 'react'
import { Item , Title, Amount} from '../Dashboard-style'
import { renderAmount } from '../../../functions'
import { useSelector } from 'react-redux'
import { Doughnut } from 'react-chartjs-2'

const Expenses = () => {
    const { lang } = useSelector(state => state.settings)

    const data = {
        datasets: [
            { 
                data: [10, 20, 30],
                label: "Label",
                backgroundColor: ["red", "blue", "yellow"]
            }
        ],
        labels: [
            'Red',
            'Yellow',
            'Blue'
        ]
    };
    
    return (
        <Item>
            <Title>Expenses</Title>
            <Doughnut 
                data = {data}
                options={{
                    cutoutPercentage: 50
                }}
            />
        </Item>
    )
}

export default Expenses