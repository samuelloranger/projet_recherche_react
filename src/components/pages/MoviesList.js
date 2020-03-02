import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';

//Components
import MovieListItem from '../parts/MovieListItem';
import PageSelect from '../parts/PageSelect';
import Header from '../parts/Header';
import Search from '../parts/Search';

//Firebase
import base from '../../firebase';

class MoviesList extends Component {
	state = {
		watchlist: [],
		currentPage: this.props.match.params.page,
		totalPages: 0,
		totalResults: 0,
		movies: {},
		listLoaded: false,
		error: false,
		errorMessage: '',
		redirect: false
	};

	/**
	 * Fonction componentDidMount
	 * @description Lorsque le component vient tout juste de se monter
	 */
	componentDidMount() {
		base.syncState('/watchlist/', {
			context: this,
			state: 'watchlist'
		});

		this.updateMovies();
	}

	/**
	 * Ajout de messages au state
	 */
	addListItem = (movie) => {
		let watchlist = { ...this.state.watchlist };

		watchlist[`film-${Date.now()}`] = movie;

		this.setState({
			watchlist: watchlist
		});
	};

	/**
	 * Fonction updateMovies
	 * @description Fait une requète à l'API et update le state
	 */
	updateMovies = (page = this.state.currentPage) => {
		const api_url = 'https://api.themoviedb.org/3';
		const API_KEY = '&api_key=08b94d2812a49610389adc101ee70ad2';

		if (page < 1) {
			this.setState({
				redirect: true
			});
		}

		fetch(api_url + '/discover/movie?sort_by=popularity.desc' + API_KEY + '&page=' + page)
			.then((response) => {
				return response.json();
			})
			.then((response) => {
				// console.log(response);
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
		const { watchlist, movies, listLoaded, currentPage, totalPages, redirect } = this.state;

		if (redirect) {
			return <Redirect to="/movielist/" />;
		}

		//Affichage
		if (listLoaded) {
			return (
				<Fragment>
					<Header />
					<div className="moviesList container">
						<h1 className="pt-2 pb-2">Movies List</h1>

						<Search addListItem={this.addListItem} />

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
								const { id, original_title, poster_path } = movie;
								return (
									<MovieListItem
										key={index}
										id={id}
										title={original_title}
										addListItem={this.addListItem}
										poster_path={poster_path}
										watchlist={watchlist}
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
							/>
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
