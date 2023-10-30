export const MovieCard = ({movie, onMovieClick}) => {
    //const movieID = movie._id;
    const movieID ="hi";
    
    return (
        <div
            key={movieID}
            onClick={() => {
                onMovieClick(movie);
            }}
        >

        {movie.title}

        </div>
    );
};