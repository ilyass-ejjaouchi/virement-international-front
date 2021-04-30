import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.css";
import reportWebVitals from './reportWebVitals';
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from "react-redux";
import dialogReducer from './Redux/Reducers/DialogReducer';
import VirementReducer from "./Redux/Reducers/VirementReducer";
import BeneficiareReducer from "./Redux/Reducers/BeneficiareReducer";
import StepperReducer from "./Redux/Reducers/StepperReducer";
import PasswordModelReducer from "./Redux/Reducers/PasswordModelReducer";
import AuthenticationReducer from "./Redux/Reducers/AuthenticationReducer";
import {logger} from "redux-logger/src";
import { reducer as formReducer } from 'redux-form';
import SnackbarReducer from "./Redux/Reducers/SnackbarReducer";

const rootReducer = combineReducers({
    dialogReducer,form: formReducer,VirementReducer, BeneficiareReducer,
    StepperReducer,SnackbarReducer,AuthenticationReducer,PasswordModelReducer
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

reportWebVitals();
