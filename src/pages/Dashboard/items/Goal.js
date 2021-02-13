import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Title } from '../Dashboard-style'
import GaugeChart from 'react-gauge-chart'
import { useSelector, useDispatch  } from 'react-redux'
import * as actions from '../../../store/actions'

const Container = styled.div`
    width: 100%;
    height: 100%;
    background: ${props => props.theme.surface};
    padding: 2rem;
    border-radius: 1.5rem;
    display: flex;
    flex-direction: column;
    position: relative;
    // overflow: hidden;
`



const ChartContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

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
            // fill: red;

        }
    }
`

const Cta = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: 3;
    transition: all .3s ease-in;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    :hover {
        background: rgba(0, 0,0, .6);
    }
`

const CtaText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    * {
        line-height: 1.4;
    }
`

const CtaTextMain = styled.div`
    font-size: 24px;
    color: ${props => props.theme.white};
`

const CtaTextSub = styled.div`
    font-size: 16px;
    color: ${props => props.theme.text_light};
`


const Goal = () => {
    const {
        user: { goal, assets },
        ui: { dashboard, sidebar }
    } = useSelector(state => state)
    const dispatch = useDispatch()

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



    const chartStyle = () => {
        if(!sidebar.isShown){
            return {
                width: "80%",
                height: "80%",
            }
        } else {
            return {
                width: "100%",
                height: "100%"
            }
        }
    }

    return (
        <Container>
            <Title>Goal</Title>
            {!goal && !dashboard.isManaging && (
                <Cta onClick={() => dispatch(actions.toggleForm())}>
                    <CtaText>
                        <CtaTextMain>
                            Click to  set your goal 
                        </CtaTextMain>
                    </CtaText>
                </Cta>
            )}

            <ChartContainer levels={levels} activeLevels={activeLevels} inActiveLevels={levels - activeLevels}>
                <GaugeChart 
                    nrOfLevels={levels} 
                    colors={["#2E3E4E", "#3780c8"]} 
                    percent={goal && goal.amount ? balance / goal.amount : 2 / 40} 
                    cornerRadius={0} 
                    arcPadding={0.02}
                    id="goal"
                    animate={false}
                    style={chartStyle()}
                />
            </ChartContainer>
        </Container>
    )
}

export default Goal
