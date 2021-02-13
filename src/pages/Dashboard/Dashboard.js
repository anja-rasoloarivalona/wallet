import React, { useEffect, useState } from 'react'
import GridLayout from 'react-grid-layout'
import "../../../node_modules/react-grid-layout/css/styles.css"
import "../../../node_modules/react-resizable/css/styles.css"
import { useSelector } from 'react-redux'
import { Container, GridContainer,  GridItem } from './Dashboard-style'
import {ThisPeriod, Stats, Goal, History, Transactions, MonthlyExpenses, MonthlyIncomes, ComparedToLastMonth, Expenses, Budget, Assets } from './items'
import Header from './DashboardHeader'
import { useWindowSize } from '../../functions'
import * as actions from '../../store/actions'
import { useDispatch } from 'react-redux'



const Dashboard = props => {
    const dispatch = useDispatch()
    const { windowWidth } = useWindowSize()
    const {
        user : { token, assets},
        ui : { sidebar, dashboard },
        settings: { dashboard: dashboard_layout}
    } = useSelector(state => state)

    const [breakpoint, setBreakPoint] = useState(null)

    const db = {
        max: { max: 9999, min: 2001 , cols: 24 , asset: { size: 6, x: 8 } },
        xxl: { max: 2000, min: 1601 , cols: 24, asset: { size: 6, x: 8 } },
        xl:  { max: 1600, min: 1401 , cols: 24, asset: { size: 7, x: 8 } },
        lg:  { max: 1400, min: 1201 , cols: 20, asset: { size: 7, x: 8 } },
        md:  { max: 1200, min: 1001 , cols: 20, asset: { size: 8, x: 10 } },
        sm:  { max: 1000, min: 801 , cols: 12, asset: { size: 6, x: 8 } },
        xs:  { max: 800,  min: 501 , cols: 12, asset: { size: 6, x: 8 } },
        xxs: { max: 500,  min: 500 , cols: 12, asset: { size: 6, x: 0 } },
    }

    useEffect(() => {
        Object.keys(db).forEach(size => {
            if(windowWidth >= db[size].min && windowWidth <= db[size].max){
                if(breakpoint !== size){
                    setBreakPoint(size)
                }
                console.log({
                    current: size
                })
                return
            }
        })
    }, [windowWidth])


    const getDashboardWidth = () => {
        if(windowWidth > 767){
            if(sidebar.isShown){
                return windowWidth - 285
            } else {
                return windowWidth - 105
            }
        } else {
            return windowWidth
        }
    }


    const components = {
        history: History,
        "monthly-expenses": MonthlyExpenses,
        "monthly-incomes": MonthlyIncomes,
        "compared-to-last-month": ComparedToLastMonth,
        expenses: Expenses,
        transactions: Transactions,
        asset: Assets,
        budget: Budget,
        goal: Goal,
        stats: Stats,
        "this-period": ThisPeriod
    }

    const initial_layout = {
        max: [
            { w: 14, h: 7, x: 0, y: 11, i: "history", Component: History, display: true },
            { w: 8, h: 4, x: 0, y: 0, i: "this-period", Component: ThisPeriod, display: true },
            { w: 5, h: 3, x: 5, y: 0, i: "monthly-expenses", Component: MonthlyExpenses, display: false },
            { w: 5, h: 3, x: 0, y: 0,  i: "monthly-incomes", Component: MonthlyIncomes, display: false },
            { w: 10, h: 7, x: 14, y: 11, i: "goal", Component: Goal, display: true },
            { w: 7, h: 4, x: 17, y: 0, i: "compared-to-last-month", Component: ComparedToLastMonth, display: false },
            { w: 14, h: 7, x: 0, y: 4, i: "stats", Component: Stats, display: true },
            { w: 10, h: 7, x: 14, y: 4, i: "expenses", Component: Expenses, display: true },
            { w: 16, h: 8, x: 8, y: 18, i: "budget", Component: Budget, display: true },
            { w: 8, h: 8, x: 0, y: 18, i: "transactions", Component: Transactions, display: true },
        ],
        xxl: [
            { w: 14, h: 7, x: 0, y: 11, i: "history", Component: History, display: true },
            { w: 8, h: 4, x: 0, y: 0, i: "this-period", Component: ThisPeriod, display: true },
            { w: 5, h: 3, x: 5, y: 0, i: "monthly-expenses", Component: MonthlyExpenses, display: false },
            { w: 5, h: 3, x: 0, y: 0,  i: "monthly-incomes", Component: MonthlyIncomes, display: false },
            { w: 10, h: 7, x: 14, y: 11, i: "goal", Component: Goal, display: true },
            { w: 7, h: 4, x: 17, y: 0, i: "compared-to-last-month", Component: ComparedToLastMonth, display: false },
            { w: 14, h: 7, x: 0, y: 4, i: "stats", Component: Stats, display: true },
            { w: 10, h: 7, x: 14, y: 4, i: "expenses", Component: Expenses, display: true },
            { w: 16, h: 8, x: 8, y: 18, i: "budget", Component: Budget, display: true },
            { w: 8, h: 8, x: 0, y: 18, i: "transactions", Component: Transactions, display: true },
        ],
        xl: [
            { w: 14, h: 7, x: 0, y: 11, i: "history", Component: History, display: true },
            { w: 8, h: 4, x: 0, y: 0, i: "this-period", Component: ThisPeriod, display: true },
            { w: 5, h: 3, x: 5, y: 0, i: "monthly-expenses", Component: MonthlyExpenses, display: false },
            { w: 5, h: 3, x: 0, y: 0,  i: "monthly-incomes", Component: MonthlyIncomes, display: false },
            { w: 10, h: 7, x: 14, y: 11, i: "goal", Component: Goal, display: true },
            { w: 7, h: 4, x: 17, y: 0, i: "compared-to-last-month", Component: ComparedToLastMonth, display: false },
            { w: 14, h: 7, x: 0, y: 4, i: "stats", Component: Stats, display: true },
            { w: 10, h: 7, x: 14, y: 4, i: "expenses", Component: Expenses, display: true },
            { w: 16, h: 8, x: 8, y: 18, i: "budget", Component: Budget, display: true },
            { w: 8, h: 8, x: 0, y: 18, i: "transactions", Component: Transactions, display: true },
        ],
        lg: [
            { w: 14, h: 7, x: 0, y: 11, i: "history", Component: History, display: true },
            { w: 10, h: 4, x: 0, y: 0, i: "this-period", Component: ThisPeriod, display: true },
            { w: 5, h: 3, x: 5, y: 0, i: "monthly-expenses", Component: MonthlyExpenses, display: false },
            { w: 5, h: 3, x: 0, y: 0,  i: "monthly-incomes", Component: MonthlyIncomes, display: false },
            { w: 10, h: 7, x: 14, y: 11, i: "goal", Component: Goal, display: true },
            { w: 7, h: 4, x: 17, y: 0, i: "compared-to-last-month", Component: ComparedToLastMonth, display: false },
            { w: 14, h: 7, x: 0, y: 4, i: "stats", Component: Stats, display: true },
            { w: 10, h: 7, x: 14, y: 4, i: "expenses", Component: Expenses, display: true },
            { w: 12, h: 8, x: 12, y: 18, i: "budget", Component: Budget, display: true },
            { w: 12, h: 8, x: 0, y: 18, i: "transactions", Component: Transactions, display: true },
        ],
        md: [
            { w: 12, h: 8, x: 0, y: 18, i: "history", Component: History, display: true },
            { w: 10, h: 4, x: 0, y: 0, i: "this-period", Component: ThisPeriod, display: true },
            { w: 5, h: 3, x: 5, y: 0, i: "monthly-expenses", Component: MonthlyExpenses, display: false },
            { w: 5, h: 3, x: 0, y: 0,  i: "monthly-incomes", Component: MonthlyIncomes, display: false },
            { w: 8, h: 7, x: 12, y: 0, i: "goal", Component: Goal, display: true },
            { w: 7, h: 4, x: 17, y: 0, i: "compared-to-last-month", Component: ComparedToLastMonth, display: false },
            { w: 12, h: 7, x: 0, y: 3, i: "stats", Component: Stats, display: true },
            { w: 10, h: 7, x: 0, y: 11, i: "expenses", Component: Expenses, display: true },
            { w: 8, h: 8, x: 12, y: 18, i: "budget", Component: Budget, display: true },
            { w: 10, h: 7, x: 10, y: 11, i: "transactions", Component: Transactions, display: true },
        ],
        sm: [
            { w: 12, h: 8, x: 0, y: 4, i: "history", Component: History, display: true },
            { w: 12, h: 4, x: 0, y: 0, i: "this-period", Component: ThisPeriod, display: true },
            { w: 12, h: 3, x: 0, y: 0, i: "monthly-expenses", Component: MonthlyExpenses, display: false },
            { w: 12, h: 3, x: 0, y: 0,  i: "monthly-incomes", Component: MonthlyIncomes, display: false },
            { w: 6, h: 6, x: 0, y: 0, i: "goal", Component: Goal, display: true },
            { w: 12, h: 4, x: 0, y: 0, i: "compared-to-last-month", Component: ComparedToLastMonth, display: false },
            { w: 12, h: 7, x: 0, y: 3, i: "stats", Component: Stats, display: true },
            { w: 12, h: 7, x: 0, y: 3, i: "expenses", Component: Expenses, display: true },
            { w: 12, h: 6, x: 0, y: 12, i: "budget", Component: Budget, display: true },
            { w: 12, h: 8, x: 0, y: 10, i: "transactions", Component: Transactions, display: true },
        ],
        xs: [
            { w: 14, h: 7, x: 0, y: 11, i: "history", Component: History, display: true },
            { w: 10, h: 4, x: 0, y: 0, i: "this-period", Component: ThisPeriod, display: true },
            { w: 5, h: 3, x: 5, y: 0, i: "monthly-expenses", Component: MonthlyExpenses, display: false },
            { w: 5, h: 3, x: 0, y: 0,  i: "monthly-incomes", Component: MonthlyIncomes, display: false },
            { w: 10, h: 7, x: 14, y: 11, i: "goal", Component: Goal, display: true },
            { w: 7, h: 4, x: 17, y: 0, i: "compared-to-last-month", Component: ComparedToLastMonth, display: false },
            { w: 14, h: 7, x: 0, y: 4, i: "stats", Component: Stats, display: true },
            { w: 10, h: 7, x: 14, y: 4, i: "expenses", Component: Expenses, display: true },
            { w: 16, h: 8, x: 8, y: 18, i: "budget", Component: Budget, display: true },
            { w: 8, h: 8, x: 0, y: 18, i: "transactions", Component: Transactions, display: true },
        ],
        xxs: [
            { w: 14, h: 7, x: 0, y: 11, i: "history", Component: History, display: true },
            { w: 10, h: 4, x: 0, y: 0, i: "this-period", Component: ThisPeriod, display: true },
            { w: 5, h: 3, x: 5, y: 0, i: "monthly-expenses", Component: MonthlyExpenses, display: false },
            { w: 5, h: 3, x: 0, y: 0,  i: "monthly-incomes", Component: MonthlyIncomes, display: false },
            { w: 10, h: 7, x: 14, y: 11, i: "goal", Component: Goal, display: true },
            { w: 7, h: 4, x: 17, y: 0, i: "compared-to-last-month", Component: ComparedToLastMonth, display: false },
            { w: 14, h: 7, x: 0, y: 4, i: "stats", Component: Stats, display: true },
            { w: 10, h: 7, x: 14, y: 4, i: "expenses", Component: Expenses, display: true },
            { w: 16, h: 8, x: 8, y: 18, i: "budget", Component: Budget, display: true },
            { w: 8, h: 8, x: 0, y: 18, i: "transactions", Component: Transactions, display: true },
        ]
    }

    if(assets){
        assets.forEach((asset, index) => {
            const yData = (6 * (index + 1)) - 6

            Object.keys(initial_layout).forEach(bp => {
                initial_layout[bp].push({
                    w: db[bp].asset.size, h: 4, x: db[bp].asset.x, y: yData,  display: true , i: `${asset.id}-assets`, Component: () => <Assets asset={asset} />
                })
            })
        })
    }

    const [layout, setLayout] = useState(initial_layout)

    useEffect(() => {
        if(!token){
            props.history.push("/login")
        }
    },[])

    useEffect(() => {
        if(dashboard_layout && Object.keys(dashboard_layout).length > 0 ){  
            const data = []
            for(const item in dashboard_layout){
                if(dashboard_layout[item].i.includes("assets")){

                    const asset_id = dashboard_layout[item].i.split('-')[0]
                    const asset_index = assets.findIndex(item => item.id === asset_id)

                    data.push({
                        ...dashboard_layout[item],
                        Component:  () => <Assets asset={assets[asset_index]} /> 
                    })
                    
                } else {
                    data.push({
                        ...dashboard_layout[item],
                        Component: components[dashboard_layout[item].i]
                    })
                }
         
            }
            setLayout(data)
        }
    },[dashboard_layout])



    const stop = data => {
        const breakPoint = breakpoint

        const updatedLayout = {}
        const _layout = layout[breakPoint].map(item => ({...item}))

        _layout.forEach(item => {
            delete item.Component
            updatedLayout[item.i] = item
        })
        data.forEach(item => {
            updatedLayout[item.i] = {
                ...updatedLayout[item.i],
                ...item
            }
        })
        dispatch(actions.updateDashboardLayout(updatedLayout, breakPoint))
    }

    const renderItem = item => {
        const { Component } = item
        return (
            <GridItem
              key={item.i}
              style={{zIndex: item.i === "expenses" ? 5 : 1}}
          >
                <Component />
            </GridItem>
        )
    }

    if(!token || !breakpoint){
        return <div></div>
    }

    return (
        <Container>
            <Header />
            <GridContainer>
                <GridLayout
                    className="layout"
                    layout={layout[breakpoint]}
                    cols={db[breakpoint].cols}

                    rowHeight={34}
                    width={getDashboardWidth()}
                    onDragStop={stop}
                    onResizeStop={stop}
                    margin={[15, 15]}
                    isDraggable={dashboard.isManaging}
                    isResizable={dashboard.isManaging}
                >   
                    {layout[breakpoint].filter(item => item.display === true).map(item => renderItem(item))}
                </GridLayout>
            </GridContainer>
        </Container>
    )
}

export default Dashboard
