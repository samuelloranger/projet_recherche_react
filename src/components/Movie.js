import React, { Component } from 'react';

class Movie extends Component {
    render() {
        const { title, poster_path, description } = this.props;
        return (
            <div>
                <h2>{ title }</h2>
                <img src={ `https://image.tmdb.org/t/p/w500${poster_path}` } alt={ "Movie poster of the movie " + title}/>
                <p>{ description }</p>
            </div>
        );
    }
}

export default Movie;