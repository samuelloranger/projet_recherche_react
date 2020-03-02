import React from 'react';
import ImgCouverture from './ImgCouverture';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';

const SearchItem = ({ id, watchlist, title, addListItem, poster_path }) => {
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

	if (!movieIsInWatchlist()) {
		return (
			<div className="recherche__liste__item" onClick={addItem}>
				<div className="image">
					<ImgCouverture title={title} poster_path={poster_path} />
				</div>
				<div class="movieInfos">
					<p className="movieInfos__title">{title}</p>
					<p className="movieInfos__addButton">
						<FontAwesomeIcon className="movieInfos__addButton__icon" icon={faPlus} /> Add to watchlist
					</p>
				</div>
			</div>
<<<<<<< HEAD
			<div className="movieInfos">
				<p className="movieInfos__title">{title}</p>
				<p className="movieInfos__addButton">
					<FontAwesomeIcon className="movieInfos__addButton__icon" icon={faPlus} /> Add to watchlist
				</p>
=======
		);
	} else {
		return (
			<div className="recherche__liste__item">
				<div className="image">
					<ImgCouverture title={title} poster_path={poster_path} />
				</div>
				<div class="movieInfos">
					<p className="movieInfos__title">{title}</p>
					<p className="movieInfos__isInWatchlist">
						<FontAwesomeIcon className="movieInfos__isInWatchlist__icon" icon={faCheck} /> Movie already in
						watchlist
					</p>
				</div>
>>>>>>> d63e74b1c2fb1545a277d346f2e067cea075774e
			</div>
		);
	}
};

export default SearchItem;
