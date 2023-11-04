import PropTypes from "prop-types";
import { Button, Card, Container} from 'react-bootstrap';
import React, {useState} from "react";
import {Link} from "react-router-dom"

import './movie-card.scss';

export const MovieCard = ({movie, user, updateUser, token, appWebsite, addFavMovie, remFavMovie}) => {

    const[isFavorite, setIsFavorite] = useState(user.favoriteMovies.includes(movie._id));

    const removeFavoriteMovie = (event) => {
        event.preventDefault();

        if(!token)
            return;

            fetch(appWebsite+`/users/${user._id}/movies/${movie._id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response)=>{
            return response.json()
            }
            ).then((responseJSON) => {
                localStorage.setItem('user', JSON.stringify(responseJSON));
                updateUser(user);
                setIsFavorite(false);
                if(remFavMovie)
                    remFavMovie();
                console.log("successfully removed");
            }).catch((error)=>
                console.log(error)
            );
    }

    const addFavoriteMovie = (event) => {

        event.preventDefault();

        if(!token)
            return;

        fetch(appWebsite+`/users/${user._id}/movies/${movie._id}`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            if(response.ok)
                return response.json()
        }
        ).then((responseJSON) => {
            localStorage.setItem('user', JSON.stringify(responseJSON));
            updateUser(user);
            setIsFavorite(true);
            if(addFavMovie)
                addFavMovie();
        }).catch((error)=>
            console.log(error)
        );

    }

    return (
        <Card className="h-100 cardContainer">
            <Card.Img variant="top" className="cardImg" src={movie.image} />
            <Card.Body className="pb-0">
                <Container className="info mb-4">
                    <Card.Title className="title">{movie.title}</Card.Title>
                    <Card.Text className="genre">{movie.genre}</Card.Text>
                </Container>
                <Link tabIndex="-1" to={`/movies/${encodeURIComponent(movie._id)}`}>
                    <Button className="navButton mb-0" variant="primary">
                        Details
                    </Button> 
                </Link>
                {
                    (!isFavorite)?
                    (
                        <Button onClick={addFavoriteMovie} className="navButton mb-0">
                            Favorite
                        </Button> 
                    ):(
                        <Button onClick={removeFavoriteMovie} className="navButton mb-0">
                            Unfavorite
                        </Button> 
                    )
                }
                

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
};