import React, { Fragment } from 'react'

function ElemForm({ label, type, name, action, value }) {
    return (
        <Fragment>
            <label htmlFor={ name }>{ label }</label>
            { type !== "textarea" 
                ? <input type={ type } id={ name } name={ name } onChange={ action } value={ value}/>
                : <textarea id={ name } name={ name } onChange={ action } value={ value}></textarea>
            }
        </Fragment>
    )
}

export default ElemForm
