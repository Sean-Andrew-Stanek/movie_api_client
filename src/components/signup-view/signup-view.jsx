//////////
//
//
//
//////////

import {useState} from 'react';
import PropTypes from "prop-types";

export const SignupView = ({appWebsite}) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {

        event.preventDefault();

        const data = {
            username: username,
            password: password,
            email: email,
            birthday: birthday
        };
        console.log(appWebsite+'/users');

        fetch(appWebsite + '/users', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if(response.ok){
                alert('Signup successful!');
                window.location.reload();
            } else {
                alert('Signup failed');
            }
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username: 
                <input
                    type="text"
                    value={username}
                    autoComplete = "username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="3"
                />
            </label>
            <label>
                Password: 
                <input
                    type="password"
                    value={password}
                    autoComplete = "new-password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <label>
                Email: 
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    minLength="3"
                />
            </label>
            <label>
                Birthday: 
                <input
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                    minLength="3"
                />
            </label>


            <button type="submit">
                Submit
            </button>
        </form>
    );
};


SignupView.propTypes = {
    appWebsite: PropTypes.string.isRequired
};