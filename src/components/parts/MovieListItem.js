import React from 'react';
import ImgCouverture from './ImgCouverture';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';

const MovieListItem = ({ watchlist, id, title, poster_path, addListItem }) => {
	const addItem = () => {
		let movie = {
			id: id,
			seen: false
		};

		addListItem(movie);
	};

	const movieIsInWatchlist = () => {
		let isInWatchlist = false;
		Object.values(watchlist).forEach((movie) => {
			if (id === movie.id) {
				isInWatchlist = true;
			}
		});
		return isInWatchlist;
	};

	return (
		<div className="moviesList__movieGrid__item col-6 col-md-3 ">
			<h2>{title}</h2>
			<ImgCouverture title={title} poster_path={poster_path} />
			{!movieIsInWatchlist() ? (
				<FontAwesomeIcon className="icon" onClick={addItem} icon={faPlus} />
			) : (
				<span className="inWatchlist">
					Movie already in watchlist
					<FontAwesomeIcon className="checkIcon" icon={faCheck} />
				</span>
			)}
		</div>
	);
};

export default MovieListItem;
