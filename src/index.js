import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.css";
import reportWebVitals from './reportWebVitals';
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from "react-redux";
import dialogReducer from './Reducers/DialogReducer';
import VirementReducer from "./Reducers/VirementReducer";
import {logger} from "redux-logger/src";
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    dialogReducer,form: formReducer,VirementReducer
})
const store = createStore(rootReducer, applyMiddleware(logger))

ReactDOM.render(
    <Provider store={store}>
    <React.StrictMode>
             <App/>
    </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
