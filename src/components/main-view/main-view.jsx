//Temporary Data
import { useState, useEffect } from 'react';
import Movies from '../../mock-data/movies.json';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("https://my-movie-db-1195f41cc20f.herokuapp.com/movies")
        .then((response) => response.json())
        .then((data) => {
            const moviesFromAPI = data.map((movie) =>{
                return {
                    _id: movie._id,
                    title: movie.title,
                    director: movie.director.name,
                    image: movie.image
                }
            })
            setMovies(moviesFromAPI);
        })
        .catch(err => {
            console.log(err);

        });
    }, []);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if(selectedMovie){
        return(
            <MovieView 
                movie={selectedMovie} 
                onBackClick={() => {
                    setSelectedMovie(null);
                }}
            />
        );
    }

    if(movies.length === 0) {
        return <div> There are no movies in the array!</div>;
    }

    return (
        <div>
            {movies.map((movie) => {
                return (
                    <MovieCard 
                        movie={movie}
                        onMovieClick={(newSelectedMovie) =>{
                            setSelectedMovie(newSelectedMovie);
                        }}
                    />
                );
            })}
        </div>
    );
};

