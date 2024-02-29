import { Button, Card, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import React from 'react';
import PropTypes from 'prop-types';



import './movie-view.scss';

export const MovieView = ({movie, filterByGenre}) => {

    if(movie == undefined)
    {
        return;
    }

    //ARIA tags
    var altText = `Picture of ${movie.title}`;

    return (
        <>
            <Card className='cardContainer'>
                <Card.Img variant='top' className='mainCardImg' src={movie.image} alt={altText} />
                <Card.Body className='pb-0'>
                    <Container className='info mb-4'>
                        <Card.Title className='title'>Title: {movie.title}</Card.Title>
                        <Card.Text className='genre'>
                            Director: {movie.director}<br />
                            Genre: {movie.genre}                  
                        </Card.Text>
                    </Container>
                    <Link to={'/'}>
                        <Button className='navButton mb-2' variant='primary'>
                            Back
                        </Button> 
                    </Link>
                </Card.Body>
            </Card>
            <h2>Similar Movies</h2>
            {filterByGenre(movie)}
        </>
    );
};

MovieView.propTypes = {
    movie: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        genre: PropTypes.string,
        director: PropTypes.string,
        image: PropTypes.string.isRequired
    }).isRequired,
    filterByGenre: PropTypes.func.isRequired
};