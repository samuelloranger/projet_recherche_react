import React from 'react';
import ImgCouverture from './ImgCouverture';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const MovieListItem = ({ id, title, poster_path, addListItem }) => {
	const addItem = () => {
		let movie = {
			id: id,
			seen: false
		};

		addListItem(movie);
	};

	return (
		<div className="moviesList__movieGrid__item col-6 col-md-3 ">
			<h2>{title}</h2>
			<ImgCouverture title={title} poster_path={poster_path} />
			<FontAwesomeIcon className="icon" onClick={addItem} icon={faPlus} />
		</div>
	);
};

export default MovieListItem;
