import PropTypes from "prop-types";
import { Button, Card, Container} from 'react-bootstrap';

import './movie-view.scss';

export const MovieView = ({movie, onBackClick}) => {
    
    //ARIA tags
    var altText = `Picture of ${movie.title}`;

    return (

        <Card className="cardContainer">
            <Card.Img variant="top" className="mainCardImg" src={movie.image} />
            <Card.Body className="pb-0">
                <Container className="info mb-4">
                    <Card.Title className="title">Title: {movie.title}</Card.Title>
                    <Card.Text className="genre">
                        Director: {movie.director}<br />
                        Genre: {movie.genre}                  
                    </Card.Text>
                </Container>
                <Button onClick={() => onBackClick(movie)} className="navButton mb-2" variant="primary">
                    Back
                </Button> 
            </Card.Body>
        </Card>
    );
};

MovieView.propTypes = {
    movie: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};