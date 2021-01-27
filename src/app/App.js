import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Config from './config'
import { CategoriesForm, AssetForm, TransactionsForm, BudgetForm, Header, Sidebar} from '../elements'
import ErrorModal from '../components/ErrorModal'
import Routes from './routes'
import { useSelector, useDispatch } from 'react-redux'
import { client } from '../functions'
import * as actions from '../store/actions'
import axios from 'axios'
const AddTransaction = styled.button`
    position: fixed;
    z-index: 11;
    right: 5rem;
    top: 2.7rem;
    height: 4.5rem;
    padding: 0 2rem;
    background: ${props => props.theme.surface};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    border-radius: 2rem;
    color: white;
    min-width: 12rem;
    cursor: pointer;
    border: none;
    :focus {
        outline: none;
    }
`
const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    background: rgba(0, 0, 0, .5);
    opacity: -1;
    transition: opacity .1s ease-in;

    ${props => {
        if(props.show){
            return {
                zIndex: 30,
                opacity: 1
            }
        }
    }}
`
const options = {
    method: 'GET',
    url: 'https://bloomberg-market-and-financial-news.p.rapidapi.com/market/get-full',
    params: {id: 'adsmi:ind,aex:ind,co1:com,gc1:com'},
    headers: {
      'x-rapidapi-key': '12d9747c82msh1d4e33f960313cdp1383d0jsn7a1c42dec694',
      'x-rapidapi-host': 'bloomberg-market-and-financial-news.p.rapidapi.com'
    }
  };
  




const App = () => {
    const dispatch = useDispatch()
    const [ready, setReady] = useState(false)
    const { initApp } = actions
    const { 
        text : { header, errors: errorText },
        settings : { lang },
        error : { error },
        categories: {expense, income},
        user: { isLoggedIn, appIsReady },
        ui: { openedForm,  dashboard, budgetForm }
    } = useSelector(state => state)

    const forms = {
        transactionForm: TransactionsForm,
        budgetForm: BudgetForm,
        assetForm: AssetForm
    }
    const CurrentForm = openedForm ? forms[openedForm] : null

    useEffect(async () => {
        dispatch(initApp())        
    },[])

    useEffect(() => {
        if(header && expense && income && appIsReady){
            setReady(true)
        }
    },[header, expense, income, appIsReady])


    const submitFormHandler = (data, form) => {
        dispatch(actions.updateApp(data))
        dispatch(actions.toggleForm({ form }))
    }


    if(!ready){
        return (
            <div>Loading</div>
        )
    }

    return (
        <Config>
            <Header />
            {/* <CategoriesForm /> */}
            {/* {!dashboard.isManaging && (
                <AddTransaction onClick={() => dispatch(actions.toggleForm({ form: "transactionForm" }))}>
                    Add transaction
                </AddTransaction>
            )} */}
            {isLoggedIn && <Sidebar />}
            <Background  show={openedForm} />
            {openedForm && (
                    <CurrentForm 
                        errorText={errorText}
                        submitFormHandler={submitFormHandler}
                        budgetForm={budgetForm}
                    />
            )}
            <Routes />
            {error && <ErrorModal />}
        </Config>
    )
}



export default App