import PropTypes from "prop-types";

export const MovieCard = ({movie, onMovieClick}) => {
    return (
        <div
            key={movie._id}
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
        genre: PropTypes.string,
        director: PropTypes.string,
        image: PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};