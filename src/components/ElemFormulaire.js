import React, { Fragment } from 'react';

const ElemFormulaire = ({ id, label, type, handleChangeInput }) => {
    return (
        <Fragment>
            <label htmlFor={ id }>{ label }</label>
            <input id={ id } name={id} type={ type } onChange={ handleChangeInput }/>
        </Fragment>
    );
};

export default ElemFormulaire;