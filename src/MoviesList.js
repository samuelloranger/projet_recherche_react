import React, { Component } from 'react';
import MovieListItem from './components/MovieListItem';
import PageSelect from './components/PageSelect';

//Firebase
// import base from "./firebase";

class MoviesList extends Component {
	state = {
		currentPage: 1,
		totalPages: 0,
		totalResults: 0,
		movies: {},
		listLoaded: false
	};

	// componentWillMount(){
	//   this.setState({
	//     this.props.match.params.page,
	//   });
	// }

	componentDidMount() {
		this.updateMovies();
	}

	updateMovies = () => {
		const api_url = 'https://api.themoviedb.org/3';
		const API_KEY = '&api_key=08b94d2812a49610389adc101ee70ad2';

		fetch(api_url + '/discover/movie?sort_by=popularity.desc' + API_KEY + '&page=' + this.state.currentPage)
			.then((response) => {
				return response.json();
			})
			.then((response) => {
				this.setState({
					movies: response.results,
					totalPages: response.total_pages,
					totalResults: response.total_results,
					listLoaded: true
				});
			});
	};

	// static getDerivedStateFromProps = (nextProps, prevState) => {
	// 	const prevPageNumber = prevState.currentPage;
	// 	const newPageNumber = nextProps.match.params.page;

	// 	if (prevPageNumber !== newPageNumber) {
	// 		return newPageNumber;
	// 	}
	// };

	// componentDidUpdate(nextProps) {
	// 	const { newPageNumber } = nextProps;
	// 	this.updateMovies();
	// }

	// Affichage de la page
	render() {
		const { movies, listLoaded, currentPage, totalPages } = this.state;

		//Affichage
		if (listLoaded) {
			return (
				<div className="moviesList container">
					<h1 className="pt-2 pb-2">Movies List</h1>

					<div className="moviesList__pageSelect pt-4 pb-4">
						<PageSelect currentPage={currentPage} totalPages={totalPages} changerPage={this.changerPage} />
					</div>

					<div className="moviesList__grilleFilms row">
						{movies.map((movie, index) => {
							const { original_title, poster_path } = movie;
							return <MovieListItem key={index} title={original_title} poster_path={poster_path} />;
						})}
					</div>

					<div className="moviesList__pageSelect pt-4 pb-4">
						<PageSelect currentPage={currentPage} totalPages={totalPages} changerPage={this.changerPage} />
					</div>
				</div>
			);
		} else {
			return (
				<div className="movieslist container">
					<h1 className="text-center">Movies List</h1>
					<p>Loading movies list...</p>
				</div>
			);
		}
	}
}

export default MoviesList;
