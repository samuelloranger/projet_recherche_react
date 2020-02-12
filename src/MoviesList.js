import React, { Component, Fragment } from 'react';
import MovieListItem from './components/MovieListItem';
import PageSelect from './components/PageSelect';
import Header from './components/Header';

class MoviesList extends Component {
	state = {
		currentPage: this.props.match.params.page,
		totalPages: 0,
		totalResults: 0,
		movies: {},
		listLoaded: false,
		error: false,
		errorMessage: ''
	};

	/**
	 * Fonction componentDidMount
	 * @description Lorsque le component vient tout juste de se monter
	 */
	componentDidMount() {
		this.updateMovies();
	}

	/**
	 * Fonction updateMovies
	 * @description Fait une requète à l'API et update le state
	 */
	updateMovies = (page = this.state.currentPage) => {
		const api_url = 'https://api.themoviedb.org/3';
		const API_KEY = '&api_key=08b94d2812a49610389adc101ee70ad2';

		fetch(api_url + '/discover/movie?sort_by=popularity.desc' + API_KEY + '&page=' + page)
			.then((response) => {
				return response.json();
			})
			.then((response) => {
				if (response.errors) {
					this.setState({
						error: true,
						errorMessage: response.errors[0]
					});
				} else {
					this.setState({
						currentPage: response.page,
						movies: response.results,
						totalPages: response.total_pages,
						totalResults: response.total_results,
						listLoaded: true
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	/**
	 * Fonction updatePage
	 * @description Change le state currentPage
	 */
	updatePage = (page) => {
		console.log(page);
		this.updateMovies(page);
	};

	// Render la page
	render() {
		const { movies, listLoaded, currentPage, totalPages } = this.state;

		//Affichage
		if (listLoaded) {
			return (
				<Fragment>
					<Header />
					<div className="moviesList container">
						<h1 className="pt-2 pb-2">Movies List</h1>

						<div className="moviesList__pageSelect pt-4 pb-4">
							<PageSelect
								currentPage={currentPage}
								totalPages={totalPages}
								changerPage={this.changerPage}
								updatePage={this.updatePage}
							/>
						</div>

						<div className="moviesList__grilleFilms row">
							{movies.map((movie, index) => {
								const { original_title, poster_path } = movie;
								return (
									<MovieListItem
										key={index}
										title={original_title}
										updatePage={this.updatePage}
										poster_path={poster_path}
									/>
								);
							})}
						</div>

						<div className="moviesList__pageSelect pt-4 pb-4">
							<PageSelect
								currentPage={currentPage}
								totalPages={totalPages}
								changerPage={this.changerPage}
								updatePage={this.updatePage}
							/>/>
						</div>
					</div>
				</Fragment>
			);
		} else {
			return (
				<Fragment>
					<Header />
					<div className="movieslist container">
						<h1 className="text-center">Movies List</h1>
						<p>Loading movies list...</p>
					</div>
				</Fragment>
			);
		}
	}
}

export default MoviesList;
