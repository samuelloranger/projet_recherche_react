import React, { Component } from 'react';
import WatchListItem from './components/WatchListItem';

//Firebase
import base from './firebase';

class WatchList extends Component {
	state = {
		watchlist: []
	};

	/**
	 * Lorsque le component vient de se mount, on synchronise la bd firebase
	 * et notre state messages
	 */
	componentDidMount() {
		base.syncState('/', {
			context: this,
			state: 'watchlist'
		});
	}

	handleRemove = (movie) => {
		console.log(movie);

		let watchlist = Object.values({ ...this.state.watchlist });
		const indexMovie = watchlist.indexOf(movie);

		watchlist.splice(indexMovie, 1);

		this.setState({
			watchlist: watchlist
		});
	};

	render() {
		const { watchlist } = this.state;

		return (
			<section className="sectionWatchList">
				<h1>Movies to watch</h1>
				<div className="sectionWatchList__watchList">
					{Object.values(watchlist).map((movie, index) => {
						return <WatchListItem key={index} movie={movie} handleRemove={this.handleRemove} />;
					})}
				</div>
			</section>
		);
	}
}

export default WatchList;
