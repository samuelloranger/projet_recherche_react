import React, { Component } from 'react';
import WatchListItem from './components/WatchListItem';

//Firebase
import base from './firebase';

class WatchList extends Component {
	state = {
		liste: {}
	};

	/**
	 * Lorsque le component vient de se mount, on synchronise la bd firebase
	 * et notre state messages
	 */
	componentDidMount() {
		base.syncState('/', {
			context: this,
			state: 'liste'
		});
	}

	/**
	 * Ajout de messages au state
	 */
	addListItem = (film) => {
		const liste = { ...this.state.liste };

		liste[`film-${Date.now()}`] = film;

		this.setState({
			liste: liste
		});
	};

	test = () => {
		const movie = {
			id: 650,
			seen: false
		};

		this.addListItem(movie);
		this.addListItem(movie);
		this.addListItem(movie);
	};

	render() {
		const { liste } = this.state;

		return (
			<section className="sectionWatchList">
				<h1>Movies to watch</h1>
				<div className="sectionWatchList__watchList">
					{Object.keys(liste).map((movie, index) => {
						const { id, seen } = movie;
						return <WatchListItem key={index} id={id} seen={seen} />;
					})}
				</div>
			</section>
		);
	}
}

export default WatchList;
