import React from 'react';

function Header({ username }) {
	return (
		<header className="header">
			<div className="container">
				<h1 className="text-center">{username}'s recipe</h1>
			</div>
		</header>
	);
}

export default Header;
