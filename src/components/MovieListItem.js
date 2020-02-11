import React, { Component } from 'react';

class MovieListItem extends Component {
	render() {
		const { title, poster_path } = this.props;
		return (
			<div className="moviesList__movieGrid__item col-md-3 ">
				<h2>{title}</h2>
				<img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={'Movie poster of the movie ' + title} />
			</div>
		);
	}
}

export default MovieListItem;
