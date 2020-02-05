import React from 'react';

const Button = ({ action, label }) => (
    <button className="btn" onClick={ action } type="button">{ label }</button>
);

export default Button;