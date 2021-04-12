import React from "react";

export const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <input {...input} placeholder={label} type={type}  className={touched && error?"form-control form-control-sm error":"form-control form-control-sm input"}/>
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
