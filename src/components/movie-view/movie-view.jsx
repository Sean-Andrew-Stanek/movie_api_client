import PropTypes from "prop-types";

export const MovieView = ({movie, onBackClick}) => {
    
    //ARIA tags
    var altText = `Picture of ${movie.title}`;

    return (
        <div key={movie._id} onClick={onBackClick}>
            <div> Title: {movie.title}</div>
            <div> Director: {movie.director} </div>
            <div><img src={movie.image} alt={altText}></img></div>
            <button>Return</button>
        </div>
    );
};

MovieView.propTypes = {
    movie: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        genre: PropTypes.string,
        image: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};