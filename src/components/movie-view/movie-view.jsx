import { Button, Card, Container} from 'react-bootstrap';
import {Link} from "react-router-dom";
import { useParams } from "react-router";

import './movie-view.scss';

export const MovieView = ({movies, filterByGenre}) => {
    const {movieId} = useParams();

    const movie = movies.find((movie) => movie._id === movieId);
    if(movie == undefined)
    {
        return;
    }

    //ARIA tags
    var altText = `Picture of ${movie.title}`;

    return (
        <>
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
                    <Link to={'/'}>
                        <Button className="navButton mb-2" variant="primary">
                            Back
                        </Button> 
                    </Link>
                </Card.Body>
            </Card>
            <h2>Similar Movies</h2>
            <div>
                {filterByGenre(movie)}
            </div>
        </>
    );
};