import React from 'react';

const Button = ({ className = '', action, children }) => (
	<button className={`btn ${className}`} onClick={action} type="text">
		{children}
	</button>
);

export default Button;
