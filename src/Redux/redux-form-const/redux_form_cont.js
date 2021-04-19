import React from "react";
import '../../App.css'
import DatePicker from "react-datepicker";
import moment from "moment";
import {addDays} from "date-fns";

export const renderField = ({ input, label, type,maxlenght, disabled, meta: { touched, error } }) => (
    <div>
        <input maxLength={maxlenght} disabled={disabled} {...input} placeholder={label} type={type}  className={touched && error?"form-control form-control-sm error":"form-control form-control-sm input"}/>
        {touched && ((error && <span className="errormsg">{error}</span>))}
    </div>
)
export const renderSelectField = ({ input, label, type, meta: { touched, error }, children }) => (
    <div>
        <select {...input} className={touched && error?"form-control form-control-sm error":"form-control form-control-sm input"}>
            {children}
        </select>
        {touched && ((error && <span className="errormsg">{error}</span>))}
    </div>
)
export const renderCheckboxField = ({ input,label, meta: { touched, error} }) => (
    <div className="form-check">
        <input className="form-check-input" type="radio" {...input} value={label} />
        <label className="form-check-label">{label}</label>
        {touched && ((error && <span className="errormsg">{error}</span>))}
    </div>
)
export const renderDatePicker = ({input, placeholder, minDate,maxDate, meta: {touched, error} }) => (
    <div>
        <DatePicker autoComplete="off" className={touched && error?"form-control form-control-sm error":"form-control form-control-sm input"}
                    placeholderText={placeholder} {...input} selected={input.value ?input.value : null} dateFormat="dd/MM/yyyy"
                    minDate={minDate} maxDate={maxDate}/>
        {touched && ((error && <span className="errormsg">{error}</span>))}
    </div>
);
