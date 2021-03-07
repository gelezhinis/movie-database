import React, {useState, useEffect} from 'react';

import {ReactComponent as MovieIcon} from '../../icons/movie.svg';
import {ReactComponent as SearchIcon} from '../../icons/search.svg';

import './Search.scss';

const API_KEY = '292aef1561cdca6d3de6c932d6961eef';

const Search = () => {
   const [movies, setMovies] = useState([]);
   const [searchPhrase, setSearchPhrase] = useState('');
   const [showFirstResult, setShowFirstResult] = useState(false);

   useEffect(() => {
      if (searchPhrase !== '') {
         fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchPhrase}`, {
            method: 'GET',
         })
            .then(res => res.json())
            .then(data => 
               setMovies(data.results ? data.results.slice(0, 8) : '')); 
      }
   }, [searchPhrase]);

   const searchPhraseHandler = (event) => {
      const phrase = event.target.value;
     
      if (phrase.length < 3) {
         setMovies([]);
      }

      return (phrase && phrase.length > 2) 
         ? setSearchPhrase(phrase) 
         : setShowFirstResult(false);
   };

   const getMoviesResults = () => {
      if (movies.length === 0) {
         return;
      }
      // console.log(movies);
      setShowFirstResult(true);
   }

   return (
      <div className="search-container">
         <div className="search-field">
            <div className="movie-icon-container">
               <MovieIcon className="movie-icon" />
            </div>
            <input onChange={searchPhraseHandler} type="text" list="movie-data" placeholder="Enter movie name" />
               <datalist id="movie-data">
                  {
                     movies ? 
                        movies.map(movie => {
                           return (
                              <option key={movie.id}>
                                 {movie.original_title} 
                              </option>
                           )
                        })  : null
                  }
               </datalist>
            <div className="search-icon-container">
               <SearchIcon className="search-icon" onClick={getMoviesResults} />
            </div>
         </div>
         <div className="search-result">
            {
               showFirstResult ? (
                  <div className="movie-description-container">
                     <h2>{movies[0].original_title}</h2>
                     <div className="movie-credentials">
                        <span>{movies[0].release_date}</span>
                        <span>Rating: {movies[0].vote_average}</span>
                     </div>
                     <img src={`https://image.tmdb.org/t/p/w400${movies[0].backdrop_path}`} alt={movies[0].title}/>
                     <p>{movies[0].overview}</p>
                  </div>
               ) : null
            }
         </div>
      </div>
   );
};

export default Search;