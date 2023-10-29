//Temporary Data
import { useState } from 'react';
import Movies from '../../mock-data/movies.json';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {

    const [movies, setMovies] = useState(Movies);

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

