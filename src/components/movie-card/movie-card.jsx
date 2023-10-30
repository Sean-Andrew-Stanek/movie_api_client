import PropTypes from "prop-types";

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

MovieCard.propTypes = {
    movie: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        director: PropTypes.string,
        image: PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};