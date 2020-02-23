import React from 'react';
import ImgCouverture from './ImgCouverture';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const SearchItem = ({ id, title, addListItem, poster_path }) => {
	const addItem = () => {
		let movie = {
			id: id,
			seen: false
		};

		addListItem(movie);
	};

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
	);
};

export default SearchItem;
