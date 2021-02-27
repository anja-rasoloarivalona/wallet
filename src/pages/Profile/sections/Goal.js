import React, {useState, useEffect } from 'react'
import styled from 'styled-components'
import { Title, TitleText } from '../Profile-style'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../../store/actions'
import GaugeChart from 'react-gauge-chart'
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome'

const Container = styled.div`
    margin-bottom: 6rem;
`

const GoalCta = styled.div`
    cursor: pointer;
    svg {
        color: ${props => props.theme.text_light};
    }
    :hover {
        svg {
            color: ${props => props.theme.primary};
        }
    }
`


const ChartContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60rem;
    height: 40rem;
    background: ${props => props.theme.surface};

    .text-group {
        text {
            display: none !important;
        }
    }

    .doughnut {
        ${props => {
            let actives = {}
            for(let i = props.activeLevels + 1; i < props.levels + 1; i++){
                actives[`.arc:nth-child(${i})`] = {
                    "& path": {
                        fill: `${props.theme.background} !important`
                    }
                }  
            }
            return actives
        }}
    }

    .needle {
        & path {
            fill: red
        }

        & circle {
            fill: ${props => props.theme.background};
        }
    }
`

const Goal = () => {
    const dispatch = useDispatch()
    const {
        user: { goal, assets },
        ui: { sidebar }
    } = useSelector(state => state)

    const [trigger, setTrigger] = useState(0)

    let balance = 0
    assets.forEach(asset => {
        balance += asset.amount
    })

    const levels = 40
    let activeLevels = 0

    if(goal && goal.amount){
        activeLevels = levels * balance / goal.amount
    }

    
    useEffect(() => {
        setTrigger(Math.random())
    },[sidebar.isShown])

    return (
        <Container>
            <Title>
                <TitleText>Goal</TitleText>
                <GoalCta onClick={() => dispatch(actions.toggleForm({form: "goalForm"}))}>
                    <FontAwesomeIcon 
                        icon="pencil-alt"
                    />
                </GoalCta>
            </Title>
            <ChartContainer levels={levels} activeLevels={activeLevels} inActiveLevels={levels - activeLevels}>
                <GaugeChart 
                    nrOfLevels={levels} 
                    colors={["#2E3E4E", "#3780c8"]} 
                    percent={goal && goal.amount ? balance / goal.amount : 2 / 40} 
                    cornerRadius={0} 
                    arcPadding={0.02}
                    id="goal"
                    animate={false}
                    // style={chartStyle()}
                />
            </ChartContainer>
        </Container>
    )
}

export default Goal
