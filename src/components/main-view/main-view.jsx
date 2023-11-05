//Temporary Data
import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import Movies from '../../mock-data/movies.json';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import {NavigationBar} from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';


export const MainView = () => {

    const appWebsite = "https://my-movie-db-1195f41cc20f.herokuapp.com"
    //State Variables
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const[user, setUser] = useState(storedUser ? storedUser : null);
    const[token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const[loadingData, setLoadingData] = useState(true);
    const [displayedMovies, setDisplayedMovies] = useState([]);

    

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
                    _id: movie._id.toString(),
                    title: movie.title,
                    director: movie.director.name,
                    genre: movie.genre.name,
                    image: movie.image
                }
            })
            setMovies(moviesFromAPI);
            setDisplayedMovies(moviesFromAPI);
            setLoadingData(false);
        }).catch(err => {
            console.log(err);

        });
    }, [token]);

    //All of the currently created movieCards
    const renderedCards =                         
        displayedMovies.map((movie)=>{
            return(
                <Col className="mb-5" key={movie._id}  md={3}>
                    <MovieCard 
                        movie={movie}
                        user={user}
                        updateUser={(user)=>{setUser(user)}}
                        token={token}
                        appWebsite={appWebsite}
                    />
                </Col>                                
            )
        })

    const filterByGenre = (movie) => {
        return(         
                <Row>
                    {movies.filter((a) => a.genre === movie.genre && a._id != movie._id)
                        .map((movie) => {
                        return (
                                <>
                                {
                                    <Col className="mb-1" key={movie._id} md={4}>
                                        <MovieCard 
                                            movie={movie}
                                            user={user}
                                            updateUser={(user)=>{setUser(user)}} 
                                            token={token}
                                            appWebsite={appWebsite}
                                        />
                                    </Col>
                                }
                                </>
                        )}
                    )}
                </Row>   
        )
    }

    const filterByName = (input) => {

        //sets the displayed movies to any movie that the title or genre contains any part of the string.
        setDisplayedMovies(movies.filter((movie) => movie.genre.toLowerCase().includes(input.toLowerCase()) || movie.title.toLowerCase().includes(input.toLowerCase())));
    }

    let navigationBar = 
        <NavigationBar 
            user = {user}
            filterByName={filterByName}
            onLoggedOut={() => {
                localStorage.clear();
                setUser(null);
                setToken(null);
            }}
        />
    
    let routeToSignup =
        <Route 
            path="/signup/"
            element={
                <>
                    {user ? (
                        <Navigate to="/" />
                    ):(
                        <Col md={5}>
                            <SignupView 
                                appWebsite={appWebsite}
                            />
                        </Col>
                    )}
                </>
            }
        />

    let routeToLogin =
        <Route
            path="/login"
            element={
                <>
                    {user ? (
                        <Navigate to="/" />
                    ):(
                        <Col md={5}>
                            <LoginView 
                                onLoggedIn={
                                    (user, token) => {
                                        setUser(user);
                                        setToken(token);
                                    }
                                }
                                appWebsite={appWebsite}
                            />
                        </Col>
                    )}
                </>
            }
        />

    let routeToProfile =
        <Route
            path="/profile"
            element={
                <>
                    {!user ? (
                        <Navigate to="/login" replace />
                    ):(
                        <Col md={10}>
                            <ProfileView
                                user={user}
                                updateUser={(user)=>{setUser(user)}}
                                token={token}
                                movies={movies}
                                appWebsite={appWebsite}
                            />
                        </Col>
                    )}
                </>
            }
        />

    let routeToMovie = 
        <Route
            path="/movies/:movieId"
            element={
                <>
                    {!user ? (
                        <Navigate to="/login" replace />
                    ): movies.length === 0 ? (
                        <Col>No movies have been loaded</Col>
                    ):(
                        <Col md={8}>
                            <MovieView 
                                movies={movies}
                                filterByGenre={filterByGenre}
                            />
                        </Col>
                    )}
                </>
            }
        />



    let routeToHome = 
        <Route
            path="/"
            element={
                <>
                    {!user ? (
                        <Navigate to="/login" />
                    ):loadingData ? (
                        <div> Loading data </div>
                    ):movies.length === 0 ? (
                        <Col>No movies have been loaded</Col>
                    ):(
                        renderedCards
                    )}
                </>
            }
        />



    let returnCode =
        <>
            <BrowserRouter>
                {navigationBar}
                <Row className="justify-content-md-center mainRow"> 
                    <Routes>
                        {routeToSignup}
                        {routeToLogin}
                        {routeToProfile}
                        {routeToMovie}
                        {routeToHome}
                    </Routes>
                </Row>
            </BrowserRouter>
        </>
    return returnCode;
        
};

