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

    console.log(user);
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
            setLoadingData(false);
        })
        .catch(err => {
            console.log(err);

        });
    }, [token]);

    let navigationBar = 
        <NavigationBar 
            user = {user}
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
                            <MovieView movies={movies} />
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
                        <>
                            {movies.map((movie) => {
                                return (
                                    <Col className="mb-5" key={movie._id} md={3}>
                                        <MovieCard 
                                            movie={movie}
                                        />
                                    </Col>
                                )
                            })} 
                        </>
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

