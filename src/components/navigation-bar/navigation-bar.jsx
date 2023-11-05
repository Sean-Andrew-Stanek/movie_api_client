import {Navbar, Container, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';


import './navigation-bar.scss';

export const NavigationBar = ({user, filterByName, onLoggedOut}) => {

    const[searchText, setSearchText]=useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        filterByName(searchText);
    }

    return (
        <Navbar className="bg-transparent-light" expand="lg">
            <Navbar.Brand style={{fontSize:"1.5rem"}} as={Link} to="/">
                MovieAPI Demo
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    {!user ? (
                        <>
                            <Nav.Link as={Link} to="/login">
                                Login
                            </Nav.Link>
                            <Nav.Link as={Link} to="/signup">
                                Signup
                            </Nav.Link>
                        </>
                    ):(
                        <Container>
                            <Row>
                                <Col>
                                    <Row>
                                        <Col>
                                            <Nav.Link as={Link} to="/">
                                                Home
                                            </Nav.Link>
                                        </Col>
                                        <Col>
                                            <Nav.Link as={Link} to="/profile">
                                                Profile
                                            </Nav.Link>                                
                                        </Col>
                                        <Col>
                                            <Nav.Link onClick={onLoggedOut}>
                                                Logout
                                            </Nav.Link>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Form inline='true' onSubmit={handleSubmit}>
                                        <Row >
                                            <Col>
                                                <Form.Control 
                                                    type='text' 
                                                    placeholder='Search' 
                                                    className='mr-sm-2'
                                                    value={searchText}
                                                    onChange={(event) => setSearchText(event.target.value)}
                                                />
                                            </Col>
                                            <Col xs='auto'>
                                                <Button type='submit'>Search</Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                    )}
                </Nav>
            </Navbar.Collapse>

        </Navbar>
    );
};