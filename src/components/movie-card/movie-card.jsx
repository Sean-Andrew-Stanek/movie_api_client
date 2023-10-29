export const MovieCard = ({movie, onMovieClick}) => {

    return (
        <div
            onClick={() => {
                onMovieClick(movie);
            }}
            key={movie._id}
        >

        {movie.title}

        </div>
    );
};