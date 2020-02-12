import React, { Component } from 'react';
import ImgCouverture from './ImgCouverture';

class WatchListItem extends Component {
	state = {
		id: 0,
		title: '',
		poster_path: '',
		seen: false,
		loaded: false
	};

	componentDidMount() {
		let { id, seen } = this.props;

		this.setState(
			{
				id: id,
				seen: seen
			},
			() => {
				this.getMovieInfos();
			}
		);
	}

	handleClickSeen = () => {
		const seen = !this.state.seen;
		this.setState({
			seen: seen
		});
	};

	getMovieInfos = () => {
		const api_url = 'https://api.themoviedb.org/3';
		const API_KEY = '?api_key=08b94d2812a49610389adc101ee70ad2';

		const movie_id = this.state.id;

		fetch(`${api_url}/movie/${movie_id}${API_KEY}`)
			.then((response) => {
				return response.json();
			})
			.then((response) => {
				this.setState({
					title: response.original_title,
					poster_path: response.poster_path,
					loaded: true
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	render() {
		const { id, title, poster_path, seen, loaded } = this.state;

		if (loaded) {
			if (seen) {
				return (
					<div className="sectionWatchList__watchList__item row mb-3">
						<ImgCouverture className="col-2" title={title} poster_path={poster_path} />
						<p className="col-6">{this.state.title}</p>
						<p className="col-4" onClick={this.handleClickSeen}>
							Seen
						</p>
					</div>
				);
			} else {
				return (
					<div className="sectionWatchList__watchList__item row mb-3">
						<ImgCouverture className="col-2" title={title} poster_path={poster_path} />
						<p className="col-6">{this.state.title}</p>
						<p className="col-4" onClick={this.handleClickSeen}>
							I've seen this movie!
						</p>
					</div>
				);
			}
		} else {
			return <p>Loading..</p>;
		}
	}
}

export default WatchListItem;
