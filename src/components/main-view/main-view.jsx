//Temporary Data
import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Movies from '../../mock-data/movies.json';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';


export const MainView = () => {

    const appWebsite = "https://my-movie-db-1195f41cc20f.herokuapp.com"

    //State Variables
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const[user, setUser] = useState(storedUser ? storedUser : null);
    const[token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);  
    const[loadingData, setLoadingData] = useState(true);

    //retrieve all movie data from the db
    useEffect(() => {

        if(!token) {
            return;
        }

        fetch(appWebsite + "/movies", {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then((response) => response.json())
        .then((data) => {
            const moviesFromAPI = data.map((movie) =>{
                return {
                    _id: movie._id,
                    title: movie.title,
                    director: movie.director.name,
                    genre: movie.genre.name,
                    image: movie.image
                }
            })
            setMovies(moviesFromAPI);
            setLoadingData(false);
        })
        .catch(err => {
            console.log(err);

        });
    }, [token]);

    return(
        <Row className="justify-content-md-center mainRow"> {
            !user ? (
                <Col md={5}>
                    <LoginView 
                        onLoggedIn = {(user, token) => {
                            setUser(user);
                            setToken(token)
                        }} 
                        appWebsite = {appWebsite}
                    />
                    <div style={{fontSize:30, textAlign:'center' }}>or</div>
                    
                    <SignupView
                        appWebsite = {appWebsite}
                    />
                </Col>
            ): 
            selectedMovie ? (
                <>
                    <Row className="justify-content-md-center mainRow">
                        <Col md={8}>
                            <MovieView 
                                movie={selectedMovie} 
                                onBackClick={() => {
                                    setSelectedMovie(null);
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <h2>Similar Movies</h2>
                    </Row>
                    <Row>
                        {movies.filter((movie) => (movie.genre == selectedMovie.genre && movie.title != selectedMovie.title)).map((movie) => {
                            return (
                                <Col className="mb-1" key={movie._id} md={3}>
                                    <MovieCard 
                                        movie={movie}
                                        onMovieClick={(newSelectedMovie) =>{
                                            setSelectedMovie(newSelectedMovie);
                                        }}
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                </>
            ):
            loadingData ? (
                <div> Loading data </div>
            ):
            movies.length === 0 ? (
                <div> There are no movies in the array!</div>
            ):(
                <>
                    {movies.map((movie) => {
                        return (
                            <Col className="mb-5" key={movie._id} md={3}>
                                <MovieCard 
                                    movie={movie}
                                    onMovieClick={(newSelectedMovie) =>{
                                        setSelectedMovie(newSelectedMovie);
                                    }}
                                />
                            </Col>
                        )
                    })}                    
                    <br />
                    <button onClick={() => { setUser(null); setToken(null); localStorage.clear();}}>
                        Logout
                    </button>
                </>
            )
        } </Row>
    );
};

