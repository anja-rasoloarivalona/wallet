import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App"
import './index.css'
// Redux Setup
import { createStore, applyMiddleware, compose, combineReducers } from "redux"
import thunk from "redux-thunk"
import { Provider } from "react-redux"
import userReducer from "./store/reducers/user"
import themeReducer from "./store/reducers/theme"
import textReducer from "./store/reducers/lexique"
import settingsReducer from "./store/reducers/settings"
import errorReducer from "./store/reducers/error"
import categoriesReducer from './store/reducers/categories'
import interfaceReducer from './store/reducers/interface'

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  text: textReducer,
  settings: settingsReducer,
  error: errorReducer,
  categories: categoriesReducer,
  ui: interfaceReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))


ReactDOM.render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

