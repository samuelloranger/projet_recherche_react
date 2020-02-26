import React, { Component } from 'react';
import WatchListItem from '../parts/WatchListItem';
import Header from '../parts/Header';

//Firebase
import base from '../../firebase';

class WatchList extends Component {
	state = {
		watchlist: []
	};

	componentDidMount() {
		base.syncState('/watchlist/', {
			context: this,
			state: 'watchlist'
		});
	}

	/**
	 * Method handleRemoveWatchlist
	 * @param watchlist_id The movie with the id to remove from array
	 */
	handleRemove = (watchlist_id) => {
		let watchlist = { ...this.state.watchlist };

		watchlist[watchlist_id] = null;

		this.setState({
			watchlist: watchlist
		});
	};

	/**
	 * Method handleSeen
	 * @description Change le state de la watchlist sur le film appellé
	 * @param { string } watchlist_id le id du film a modifier
	 */
	handleSeen = (watchlist_id) => {
		let watchlist = { ...this.state.watchlist };

		watchlist[watchlist_id].seen = !watchlist[watchlist_id].seen;

		this.setState({
			watchlist: watchlist
		});
	};

	render() {
		const { watchlist } = this.state;

		const movieToWatchList = Object.entries(watchlist).filter((movie) => {
			return !movie[1].seen;
		});

		const seenList = Object.entries(watchlist).filter((movie) => {
			return movie[1].seen;
		});

		console.log();

		return (
			<main className="container">
				<Header />
				<section className="sectionWatchList">
					<h1>Watchlist</h1>

					{movieToWatchList.length > 0 ? (
						<h2 className="sectionWatchList__watchList__title">Movies to watch</h2>
					) : (
						<h2 className="sectionWatchList__watchList__title">The watchlist empty</h2>
					)}
					<div className="sectionWatchList__watchList">
						{movieToWatchList.map((movie) => {
							return (
								<WatchListItem
									key={movie[0]}
									wathlist_id={movie[0]}
									movie={movie[1]}
									handleRemove={this.handleRemove}
									handleSeen={this.handleSeen}
								/>
							);
						})}
					</div>

					{seenList.length > 0 ? (
						<h2 className="sectionWatchList__seenList__title">Seen movies</h2>
					) : (
						<h2 className="sectionWatchList__seenList__title">No movies seen</h2>
					)}
					<div className="sectionWatchList__seenList">
						{seenList.map((movie) => {
							if (movie[1].seen) {
								return (
									<WatchListItem
										key={movie[0]}
										wathlist_id={movie[0]}
										movie={movie[1]}
										handleRemove={this.handleRemove}
										handleSeen={this.handleSeen}
									/>
								);
							} else return null;
						})}
					</div>
				</section>
			</main>
		);
	}
}

export default WatchList;
