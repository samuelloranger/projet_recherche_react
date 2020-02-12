import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header className="header container">
			<nav className="header__navigation">
				<p className="header__navigation__logo">Movie List</p>
				<ul className="header__navigation__liste">
					<li className="elementListe">
						<Link to="/">Accueil</Link>
					</li>
					<li>
						<Link to="/movielist/">Movie List</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
