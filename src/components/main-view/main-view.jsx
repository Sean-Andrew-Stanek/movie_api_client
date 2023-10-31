//Temporary Data
import { useState, useEffect } from 'react';
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

    //No User - Login / Signup
    if(!user) {
        return(
            <>
                <LoginView 
                    onLoggedIn = {(user, token) => {
                        setUser(user);
                        setToken(token)
                    }} 
                    appWebsite = {appWebsite}
                />
                or
                <SignupView
                    appWebsite = {appWebsite}
                />
            </>
        );
    }

    //Render the selected movie
    if(selectedMovie){
        let similarMovies = movies.filter((movie) => (movie.genre == selectedMovie.genre && movie.title != selectedMovie.title));
        return(
            <>
                <MovieView 
                    movie={selectedMovie} 
                    onBackClick={() => {
                        setSelectedMovie(null);
                    }}
                />
                <hr/>
                <h2>Similar Movies</h2>
                <div>
                    {similarMovies.map((movie) => {
                        return (
                            <MovieCard 
                                movie={movie}
                                onMovieClick={(newSelectedMovie) =>{
                                    setSelectedMovie(newSelectedMovie);
                                }}
                            />
                        );
                    })}
                </div>
            </>
        );
    }

    //Loading data
    if(loadingData){
        return <div> Loading data </div>;
    }

    //No Data Found
    if(movies.length === 0) {
        return <div> There are no movies in the array!</div>;
    }

    //Display data
    return (
        <>
            <div>
                {movies.map((movie) => {
                    return (
                        <MovieCard 
                            movie={movie}
                            onMovieClick={(newSelectedMovie) =>{
                                setSelectedMovie(newSelectedMovie);
                            }}
                        />
                    );
                })}
            </div>
            <br />
            <button onClick={() => { setUser(null); setToken(null); localStorage.clear();}}>
                Logout
            </button>
        </>
    );
};

