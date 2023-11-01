//////////
//
//
//
//////////

import {useState} from 'react';
import PropTypes from "prop-types";
import {Button, Form, Container, Row, Card} from 'react-bootstrap'

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
        <Container>
            <Row>
                <Card>
                    <Card.Title style={{textAlign: 'center', fontSize: 36}}>Sign Up</Card.Title>
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
                                    autoComplete = "new-password"
                                    onChange={(e)=>setPassword(e.target.value)}
                                    required
                                    minLength="3"       
                                />
                            </Form.Group>

                            <Form.Group controlId="formEmail">
                                <Form.Label>
                                    Email:
                                </Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    minLength="3"            
                                />
                            </Form.Group>

                            <Form.Group controlId="formBirthday">
                                <Form.Label>
                                    Birthday:
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    value={birthday}
                                    onChange={(e) => setBirthday(e.target.value)}
                                    required            
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


SignupView.propTypes = {
    appWebsite: PropTypes.string.isRequired
};