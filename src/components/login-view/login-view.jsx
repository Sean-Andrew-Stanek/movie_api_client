//////////
//
//  Login Window
//
//////////
import React from "react";
import {useState} from "react";

import PropTypes from "prop-types";

export const LoginView = ( {onLoggedIn, appWebsite}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        //Stop reload on submit
        event.preventDefault();

        const data = {
            username: username,
            password: password
        }

        console.log(JSON.stringify(data));

        fetch(appWebsite + '/login',  {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            return response.json();
        })
        .then((resData) => {
            console.log("Login response: ", resData);
            if(resData.user){
                //Save successful login to localStorage
                localStorage.setItem('user', JSON.stringify(resData.user));
                localStorage.setItem('token', resData.token);
                onLoggedIn(resData.user, resData.token);
            }else {
                alert('No such user');
            }
        })
        .catch((e) => {
            alert('Something went wrong: ' + e);
        });

    };


    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input 
                    type='text'
                    value={username}
                    autoComplete = "username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Password:
                <input 
                    type='password'
                    value={password}
                    autoComplete = "current-password"
                    onChange={(e)=>setPassword(e.target.value)}
                />
            </label>
            <br />
            <button type='submit'>
                Submit
            </button>
        </form>
    );
};

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired,
    appWebsite: PropTypes.string.isRequired
};