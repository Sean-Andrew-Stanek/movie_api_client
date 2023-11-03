import {useState} from 'react';
import PropTypes from "prop-types";
import {Button, Form, Container, Row, Card} from 'react-bootstrap'

export const ProfileView = ({user, token, movies}) => {

    const [showEmailChange, toggleEmailChange] = useState(false);
    const [showBirthdayChange, toggleBirthdayChange] = useState(false);
    const [showPasswordChange, togglePasswordChange] = useState(false);

    const handleEmailClick = () => toggleEmailChange(!showEmailChange);
    const handleBirthdayClick = () => toggleBirthdayChange(!showBirthdayChange);
    const handlePasswordClick = () => togglePasswordChange(!showPasswordChange);

    return(
        <Container>
            <Row>
                <Card style={{backgroundColor: 'rgba(250,250,250, .8'}}>
                    
                    <Card.Title style={{backgroundColor: 'rgba(250,250,250,.3)', textAlign: 'center', fontSize: 36}}>{user.username}
                        <br /><Card.Link>change</Card.Link></Card.Title>
                    
                    <Card.Body>
                        <Container>
                            <Card.Text> Email: {user.email}<br /><Button onClick={handleEmailClick}>change</Button></Card.Text>
                            {
                                showEmailChange && 
                                    <>
                                    </>
                            }
                        </Container>

                        <Container>
                            <Card.Text> Birthday: {user.birthday}<br /><Button onClick={handleBirthdayClick}>change</Button></Card.Text>
                            {
                                showEmailChange && 
                                    <>
                                    </>
                            }
                        </Container>

                        <Container>
                            <Card.Text> Password: <br /><Button onClick={handleBirthdayClick}>change</Button> </Card.Text>
                            {
                                showPasswordChange&&
                                    <>
                                    </>
                            }
                        </Container>    
                    </Card.Body>

                </Card>
            </Row>
        </Container> 
    );
}
