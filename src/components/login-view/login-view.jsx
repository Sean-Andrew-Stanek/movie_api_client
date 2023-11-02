//////////
//
//  Login Window
//
//////////
import React from "react";
import {useState} from "react";
/* import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'; */
import {Button, Form, Container, Row, Card} from 'react-bootstrap'

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
        <Container className="mt-5">
            <Row>
                <Card>
                    <Card.Title style={{textAlign: 'center', fontSize: 36}}>Login</Card.Title>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formUsername">
                                <Form.Label>
                                    Username:
                                </Form.Label>
                                <Form.Control
                                    type='text'
                                    value={username}
                                    autoComplete = "username"
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    minLength="3"
                                />
                            </Form.Group>

                            <Form.Group controlId="formPassword">
                                <Form.Label>
                                    Password:
                                </Form.Label>
                                <Form.Control
                                    type='password'
                                    value={password}
                                    autoComplete = "current-password"
                                    onChange={(e)=>setPassword(e.target.value)}                
                                />
                            </Form.Group>
                            <Container className="text-center"> 
                                <Button className="navButton mt-2" variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Container>
                        </Form>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    );
};

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired,
    appWebsite: PropTypes.string.isRequired
};