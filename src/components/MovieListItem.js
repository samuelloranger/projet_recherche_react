import React, { Component } from 'react';
import ImgCouverture from './ImgCouverture';

class MovieListItem extends Component {
	addListItem = () => {
		const { addListItem, id } = this.props;

		let movie = {
			id: id,
			seen: false
		};

		addListItem(movie);
	};

	render() {
		const { title, poster_path } = this.props;
		return (
			<div className="moviesList__movieGrid__item col-6 col-md-3 ">
				<h2>{title}</h2>
				<ImgCouverture title={title} poster_path={poster_path} />
				<p onClick={this.addListItem}>Ajouter à la liste</p>
			</div>
		);
	}
}

export default MovieListItem;
