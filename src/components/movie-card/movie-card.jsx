import PropTypes from "prop-types";
import { Button, Card, Container} from 'react-bootstrap';

import './movie-card.scss';

export const MovieCard = ({movie, onMovieClick}) => {

    return (
        <Card className="h-100 cardContainer">
            <Card.Img variant="top" className="cardImg" src={movie.image} />
            <Card.Body className="pb-0">
                <Container className="info mb-4">
                    <Card.Title className="title">{movie.title}</Card.Title>
                    <Card.Text className="genre">{movie.genre}</Card.Text>
                </Container>
                <Button onClick={() => onMovieClick(movie)} className="navButton mb-0" variant="primary">
                    Details
                </Button> 
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        genre: PropTypes.string,
        director: PropTypes.string,
        image: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};