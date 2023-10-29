export const MovieCard = (movie, onMovieClick) => {
    return (
        <div
            onClick={() => {
                onBookClick(movie);
            }}
            key={movie._id}
        >

        {movie.title}

        </div>
    );
};