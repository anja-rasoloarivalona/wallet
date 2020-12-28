import React, { useEffect } from 'react'
import SideBar from './SideBar'
import styled from "styled-components"
import GridLayout from 'react-grid-layout'
import "../../../node_modules/react-grid-layout/css/styles.css"
import "../../../node_modules/react-resizable/css/styles.css"
import Balance from './items/Balance'
import MonthlyReport from './items/MonthlyReport'
import Expenses from './items/Expenses'
import { useSelector } from 'react-redux'

const Container = styled.div`
    grid-column: 1 / -1;
    width: 100%;
    min-height: calc(100vh - 7.5rem);
    background: ${props => props.theme.clr_background};
    padding-left: 35rem;
    padding-top: 3rem;
    display: flex;
    justify-content: center;
`
const GridContainer = styled.div`
    width: 70vw;
    max-width: 1100rem;
    // background: grey;
    display: flex;
`

const Item = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 5px;

    .react-grid-item.react-grid-placeholder {
        background-color: green !important;
        background: green !important;

      }

      .react-grid-item:not(.react-grid-placeholder) {
        background-color: green !important;
        border: 1px solid black;
    }
`



const Dashboard = props => {
    const { token } = useSelector(state => state.user)

    const layout = [
        {i: 'balance', x: 0, y: 0, w: 4, h: 3, Component: Balance},
        {i: 'monthly-report', x: 4, y: 0, w: 4, h: 3, Component: MonthlyReport}, 
        {i: 'expenses', x: 8, y: 0, w: 4, h: 6, Component: Expenses},      
    ];

      const renderItem = item => {
          const { Component } = item
          return (
              <Item key={item.i}>
                  <Component />
              </Item>
          )
      }

      useEffect(() => {
        if(!token){
            props.history.push("/login")
        }
      },[])

      

    return (
        <Container>
            <SideBar />
            <GridContainer>
                <GridLayout
                    className="layout"
                    layout={layout}
                    cols={12}
                    rowHeight={34}
                    width={1080}
                    onDragStop={(data) => console.log(data)}
                    margin={[20, 10]}
                >   
                    {layout.map(item => renderItem(item))}
                </GridLayout>
            </GridContainer>
        </Container>
    )
}

export default Dashboard
