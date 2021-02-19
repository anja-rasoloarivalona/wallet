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
import { layout  as initial_layout } from './default.json'


const Dashboard = props => {
    const dispatch = useDispatch()
    const { windowWidth } = useWindowSize()
    const {
        user : { token, assets},
        ui : { sidebar, dashboard },
        settings: { dashboard: userLayout}
    } = useSelector(state => state)

    const [breakpoint, setBreakPoint] = useState(null)

    const db = {
        max: { max: 9999, min: 2001, cols: 24, asset: { size: 6, x: 8 } },
        xxl: { max: 2000, min: 1601, cols: 24, asset: { size: 6, x: 8 } },
        xl:  { max: 1600, min: 1401, cols: 24, asset: { size: 7, x: 8 } },
        lg:  { max: 1400, min: 1201, cols: 20, asset: { size: 7, x: 8 } },
        md:  { max: 1200, min: 1001, cols: 20, asset: { size: 8, x: 10 } },
        sm:  { max: 1000, min: 801, cols: 12, asset: { size: 6, x: 8 } },
        xs:  { max: 800,  min: 501, cols: 12, asset: { size: 6, x: 8 } },
        xxs: { max: 500,  min: 0, cols: 12, asset: { size: 6, x: 0 } },
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


    const [layout, setLayout] = useState(null)


    useEffect(() => {
        if(!token){
            props.history.push("/login")
        } else {
            dispatch(actions.getDashboard())

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
            setLayout(initial_layout)
        }
    },[])

    useEffect(() => {
        if(userLayout && userLayout[breakpoint]){  
            const data = userLayout[breakpoint]
            const update = []
            for(const i in data){
                let NewComponent
                if(!i.includes("assets")){
                    NewComponent = components[data[i].i] 
                } else {
                    let assetId = data[i].i.split("-")[0]
                    let assetIndex = assets.findIndex(asset => asset.id === assetId)
                    NewComponent = () => <Assets asset={assets[assetIndex]}/>
                }
                update.push({
                    ...data[i],
                    Component: NewComponent
                })
            }

            const updatedLayout = {
                ...layout,
                [breakpoint]: update
            }
            setLayout(updatedLayout)
        }
    },[userLayout])



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
        const Component = item.Component ? item.Component : components[item.i]
        return (
            <GridItem
              key={item.i}
              style={{zIndex: item.i === "expenses" ? 5 : 1}}
          >
                <Component />
            </GridItem>
        )
    }

    if(!token || !breakpoint || !layout){
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
