import React, { useState, useEffect } from 'react';
import ImgCouverture from './ImgCouverture';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck, faMinusSquare } from '@fortawesome/free-solid-svg-icons';

const WatchListItem = ({ movie, wathlist_id, handleSeen, handleRemove }) => {
	const [ movieObject, setMovie ] = useState('');
	const [ title, setTitle ] = useState('');
	const [ poster_path, setPoster_path ] = useState('');
	const [ seen, setSeen ] = useState(false);
	const [ loaded, setLoaded ] = useState(false);

	/**
	 * Method getMovieInfos
	 * @description Va chercher les informations du film
	 */
	const getMovieInfos = () => {
		const api_url = 'https://api.themoviedb.org/3';
		const API_KEY = '?api_key=08b94d2812a49610389adc101ee70ad2';

		fetch(`${api_url}/movie/${movieObject.id}${API_KEY}`)
			.then((response) => {
				return response.json();
			})
			.then((response) => {
				setTitle(response.original_title);
				setPoster_path(response.poster_path);
				setLoaded(true);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	getMovieInfos();

	useEffect(
		() => {
			if (!loaded) {
				setMovie(movie);
				setSeen(movie.seen);
			}
		},
		[ loaded, movie ]
	);

	/**
	 * Method handleClickSeen
	 * @description Change l'état seen de l'item
	 */
	const handleClickSeen = () => {
		setSeen(!seen);

		handleSeen(wathlist_id);
	};

	/**
	 * Method handleClickRemove
	 * @description Supprime l'objet de la watchlist
	 */
	const handleClickRemove = () => {
		handleRemove(wathlist_id);
	};

	if (loaded) {
		return (
			<div className="sectionWatchList__watchList__item row mb-3">
				<ImgCouverture className="col-2" title={title} poster_path={poster_path} />
				<p className="title col-6">{title}</p>
				<div className="actions col-4">
					{!seen ? (
						<FontAwesomeIcon className="icone icone--green" icon={faCheck} onClick={handleClickSeen} />
					) : (
						<FontAwesomeIcon className="icone icone--red" icon={faMinusSquare} onClick={handleClickSeen} />
					)}
					<FontAwesomeIcon className="icone" icon={faTrash} onClick={handleClickRemove} />
				</div>
			</div>
		);
	} else {
		return <p>Loading..</p>;
	}
};

export default WatchListItem;
