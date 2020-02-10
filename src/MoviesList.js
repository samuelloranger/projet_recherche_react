import React, { Component } from 'react';
import Movie from "./components/Movie";

//Firebase
// import base from "./firebase";

class MoviesList extends Component {
  state = {
    page: 1,
    totalPages: 0,
    totalResults: 0,
    movies: {},
    listLoaded: false
  };
  
  getMovies = () => {
    // api_key=08b94d2812a49610389adc101ee70ad2
    
    fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=08b94d2812a49610389adc101ee70ad2&page=" + this.state.page)
    .then(response => {
      return response.json();
    })
    .then(response => {
      this.setState({
        movies: response.results,
        totalPages: response.total_pages,
        totalResults: response.total_results,
        listLoaded: true
      },
        console.log(response)
      );
    });
  };

  componentDidMount () {
    setTimeout(() => {
      this.getMovies()
    }, 500);
  }

  // Affichage de la page
  render () {
    const { movies, listLoaded } = this.state;

    //Affichage
    if(listLoaded){
      return (
        <div className="movieslist">
          <h1>Movies List</h1>
            {
              Object.keys(movies)
              .map(movie => (
                  <Movie 
                    key={ movie }
                    title={ movies[movie].original_title }
                    poster_path={ movies[movie].poster_path }
                    description={ movies[movie].overview }
                    />
              ))
            }
            
        </div>
      )
    }else{
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }


  };
}

export default MoviesList;