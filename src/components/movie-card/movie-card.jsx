import PropTypes from 'prop-types';
import { Button, Card, Container} from 'react-bootstrap';
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import './movie-card.scss';

export const MovieCard = ({movie, user, updateUser, token, appWebsite, visibilityToggle}) => {

    const[isFavorite, setIsFavorite] = useState(user.favoriteMovies.includes(movie._id));
    const [isVisible, setIsVisible] = useState(true);
    const [userFavorites, setUserFavorites] = useState(user.favoriteMovies);
    const[isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        setIsFavorite(user.favoriteMovies.includes(movie._id));
    }, [`${userFavorites}`]);

    const removeFavoriteMovie = (event) => {
        event.preventDefault();

        if(!token)
            return;

        //Due to high latency, I'd like to later look into React's new useOptimistic (if it goes past experimental)
        //Possibly just make our own optimistic code
        //Maybe change clickable to false (user can "click" to their heart's content)
        //CSS animation for while it is adding / deleting?

        setIsLoading(true);

        fetch(appWebsite+`/users/${user._id}/movies/${movie._id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            return response.json();
        }
        ).then((responseJSON) => {
            localStorage.setItem('user', JSON.stringify(responseJSON));
            updateUser(responseJSON);
            setUserFavorites(user.favoriteMovies);
            if(visibilityToggle)
                setIsVisible(false);
            setIsLoading(false);
        }).catch((error)=>
            console.log(error)
        );


    };

    const addFavoriteMovie = (event) => {

        event.preventDefault();

        if(!token)
            return;

        setIsLoading(true);

        fetch(appWebsite+`/users/${user._id}/movies/${movie._id}`,{
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            if(response.ok)
                return response.json();
        }
        ).then((responseJSON) => {
            localStorage.setItem('user', JSON.stringify(responseJSON));
            updateUser(responseJSON);
            //setIsFavorite(true);
            setUserFavorites(user.favoriteMovies);
            if(visibilityToggle)
                setIsVisible(true);
            setIsLoading(false);
        }).catch((error)=>
            console.log(error)
        );
    };

    return (
        <>
            {(isVisible) && (
                <Card className='h-100 cardContainer'>
                    <Card.Img variant='top' className='cardImg' src={movie.image} />
                    <Card.Body className='pb-0'>
                        <Container className='info mb-4'>
                            <Card.Title className='title'>{movie.title}</Card.Title>
                            <Card.Text className='genre'>{movie.genre}</Card.Text>
                        </Container>
                        <Link tabIndex='-1' to={`/movies/${encodeURIComponent(movie._id)}`}>
                            <Button 
                                className='navButton mb-0' variant='primary'>
                                Details
                            </Button> 
                        </Link>
                        {(!isFavorite)?
                            (
                                <Button onClick={addFavoriteMovie} className={isLoading?'buttonLoading mb-0':'navButton mb-0'}>
                                    Favorite
                                </Button> 
                            ):(
                                <Button onClick={removeFavoriteMovie} className={isLoading?'buttonLoading mb-0':'navButton mb-0'}>
                                    Unfavorite
                                </Button> 
                            )
                        }
                        

                    </Card.Body>
                </Card>
            )}
        </>
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
    user: PropTypes.shape ({
        _id: PropTypes.string.isRequired,
        favoriteMovies: PropTypes.array.isRequired    
    }).isRequired,
    updateUser: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    appWebsite: PropTypes.string.isRequired,
    visibilityToggle: PropTypes.bool    
};