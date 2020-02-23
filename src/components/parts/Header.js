import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
	return (
		<header className="header container">
			<nav className="header__navigation">
				{/* <p className="header__navigation__logo">Movie List</p> */}
				<ul className="header__navigation__liste">
					<li className="elementListe">
						<Link to="/">
							<FontAwesomeIcon className="icon" icon={faHome} />Home
						</Link>
					</li>
					<li>
						<Link to="/movielist/">
							<FontAwesomeIcon className="icon" icon={faList} />Movie index
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
