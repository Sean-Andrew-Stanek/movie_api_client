import PropTypes from 'prop-types';
import { Button, Card, CardBody, Container} from 'react-bootstrap';
import React, {useState, useEffect} from 'react';
import './movie-card.scss';
import { MovieModal } from './movie-modal/movie-modal';

export const MovieCard = ({movie, filterByGenre, user, updateUser, token, appWebsite, visibilityToggle}) => {

    const[isFavorite, setIsFavorite] = useState(user.favoriteMovies.includes(movie._id));
    const [isVisible, setIsVisible] = useState(true);
    const[isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    
    
    useEffect(() => {
        setIsFavorite(user.favoriteMovies.includes(movie._id));
    }, [user.favoriteMovies, movie._id]);

    const removeFavoriteMovie = (event) => {

        event.preventDefault();

        if(!token || isLoading)
            return;


        setIsFavorite(false);
        if(visibilityToggle)
            setIsVisible(false);

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
            setIsLoading(false);
        }).catch((error)=>
            console.log(error)
        );

    };

    const addFavoriteMovie = (event) => {

        event.preventDefault();

        if(!token || isLoading)
            return;

        setIsFavorite(true);

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
            if(visibilityToggle)
                setIsVisible(true);
            setIsLoading(false);
        }).catch((error)=>
            console.log(error)
        );
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const cardSubComponent =
        <Card className='cardContainer'>
            <CardBody>
                <Card.Img className='cardImg' src={movie.image} onClick={handleOpenModal}/>   
            </CardBody>
            <Card.Footer className='pb-1'>
                <Container className='info'>
                    <Card.Title className='title'>{movie.title}</Card.Title>
                    <Card.Text className='genre'>{movie.genre}</Card.Text>
                </Container>
                <Container className='buttonRow'>
                    <Button onClick={handleOpenModal} className='movieCardButton'>
                        Details
                    </Button>
                    {(!isFavorite)?
                        (
                            <Button onClick={addFavoriteMovie} className={isLoading?'movieCardButton buttonLoading mb-0':'movieCardButton mb-0'}>
                                Favorite
                            </Button> 
                        ):(
                            <Button onClick={removeFavoriteMovie} className={isLoading?'movieCardButton buttonLoading mb-0':'movieCardButton mb-0'}>
                                Unfavorite
                            </Button> 
                        )
                    }
                </Container>

            </Card.Footer>
        </Card>;

    return (
        <>
            {(isVisible) && (
                <>
                    {cardSubComponent}
                    <MovieModal
                        filterByGenre = {filterByGenre}
                        movie = {movie}
                        showModal = {showModal}
                        handleCloseModal = {handleCloseModal}
                    />   
                </>
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
    filterByGenre: PropTypes.func.isRequired,
    user: PropTypes.shape ({
        _id: PropTypes.string.isRequired,
        favoriteMovies: PropTypes.array.isRequired    
    }).isRequired,
    updateUser: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    appWebsite: PropTypes.string.isRequired,
    visibilityToggle: PropTypes.bool    
};