import PropTypes from "prop-types";
import {Navbar, Container, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './navigation-bar.scss';

export const NavigationBar = ({user, onLoggedOut}) => {

    return (
        <Navbar className="bg-transparent-light" expand="lg">
            <Container >
                <Navbar.Brand style={{fontSize:"1.5rem"}} as={Link} to="/">
                    MovieAPI Demo
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
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
                            <>
                                <Nav.Link as={Link} to="/">
                                    Home
                                </Nav.Link>
                                <Nav.Link onClick={onLoggedOut}>
                                    Logout
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

NavigationBar.propTypes = {
    user: PropTypes.string.isRequired,
    onLoggedOut: PropTypes.func.isRequired
};