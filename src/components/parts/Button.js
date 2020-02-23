import React from 'react';

const Button = ({ action, children }) => (
    <button className="btn" onClick={ action } type="text">{ children }</button>
);

export default Button;