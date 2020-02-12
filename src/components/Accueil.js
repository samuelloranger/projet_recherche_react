import React, { Fragment } from 'react';
import Header from './Header';
import WatchList from '../WatchList';

export const Accueil = () => {
	return (
		<Fragment>
			<Header />
			<main className="container">
				<WatchList />
			</main>
		</Fragment>
	);
};

export default Accueil;
