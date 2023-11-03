import {useState} from 'react';
import PropTypes from "prop-types";
import {Button, Form, Container, Row, Card} from 'react-bootstrap'

export const ProfileView = ({user, updateUser, token, movies, appWebsite}) => {

    const [showEmailChange, toggleEmailChange] = useState(false);
    const [showBirthdayChange, toggleBirthdayChange] = useState(false);
    const [showPasswordChange, togglePasswordChange] = useState(false);
    const [showUsernameChange, toggleUsernameChange] = useState(false);

    const handleEmailClick = () => toggleEmailChange(!showEmailChange);
    const handleBirthdayClick = () => toggleBirthdayChange(!showBirthdayChange);
    const handlePasswordClick = () => togglePasswordChange(!showPasswordChange);
    const handleUsernameClick = () => toggleUsernameChange(!showPasswordChange);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
        
    const data = {
        password:password,
        username:username,
        email:email,
        birthday:birthday
    }

    /////
    //
    //@param field - field to be updated
    //Updates the field through a PUT fetch
    //
    /////
    const handleSubmit = (field) => {

        return event =>{
            event.preventDefault();
            console.log(field)

            let postData = {};
            postData[field] = data[field];
            console.log(postData);

            if(!token){
                return;
            }

            fetch(appWebsite+`/users/${encodeURIComponent(user._id)}`,
                {
                method: "PUT",
                body: JSON.stringify(postData),
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                if(response.ok){
                    alert(`${field} updated!`);
                } else {
                    alert('Failed');
                }
                return response.json();
            }).then((responseJSON) => {
                localStorage.setItem('user', JSON.stringify(responseJSON));
                updateUser(responseJSON);
            }).catch((error)=>
                console.log(error)
            );
        }

    };

    return(
        <Container>
            <Row>
                <Card style={{backgroundColor: 'rgba(250,250,250, .8'}}>
                    {
                    //Username as Title
                    }
                    <Card.Title style={{backgroundColor: 'rgba(250,250,250,.3)', textAlign: 'center', fontSize: 36}}>{user.username}
                        </Card.Title>
                    
                    <Card.Body>
                        <Container style={{textAlign:'center'}}>
                            <Button onClick={handleUsernameClick}>Change Username</Button></Container>
                            {
                                showUsernameChange &&
                                    <Form onSubmit={handleSubmit('username')}>
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
                                            <Container className="text-center"> 
                                                <Button className="navButton mt-2" variant="primary" type="submit">
                                                    Submit
                                                </Button>
                                            </Container>
                                    </Form>

                            }
                        <Container>
                            <Card.Text> Email: {user.email}<br /><Button onClick={handleEmailClick}>change</Button></Card.Text>
                            {
                                showEmailChange && 
                                    <Form onSubmit={handleSubmit('email')}>
                                        <Form.Group controlId="formEmail">
                                            
                                            <Form.Label>
                                                Email:
                                            </Form.Label>
                                            
                                            <Form.Control
                                                type='email'
                                                value={email}
                                                autoComplete = "email"
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </Form.Group>                                            
                                            <Container className="text-center"> 
                                                <Button className="navButton mt-2" variant="primary" type="submit">
                                                    Submit
                                                </Button>
                                            </Container>

                                    </Form>
                            }
                        </Container>

                        <Container>
                            <Card.Text> Birthday: {new Date(user.birthday).toLocaleDateString()}<br /><Button onClick={handleBirthdayClick}>change</Button></Card.Text>
                            {     
                                showBirthdayChange && 
                                    <Form onSubmit={handleSubmit('birthday')}>
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
                                            
                                            <Container className="text-center"> 
                                                <Button className="navButton mt-2" variant="primary" type="submit">
                                                    Submit
                                                </Button>
                                            </Container>
                                        </Form.Group>
                                    </Form>
                            }
                        </Container>

                        <Container>
                            <Card.Text> Password: <br /><Button onClick={handlePasswordClick}>change</Button> </Card.Text>
                                {showPasswordChange && 
                                    <Form onSubmit={handleSubmit('password')}>
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
                                            
                                            <Container className="text-center"> 
                                                <Button className="navButton mt-2" variant="primary" type="submit">
                                                    Submit
                                                </Button>
                                            </Container>
                                        </Form.Group>
                                    </Form>
                                }
                        </Container>    
                    </Card.Body>

                </Card>
            </Row>
        </Container> 
    );


}
