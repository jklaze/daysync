import { Form, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import axios from 'axios';


function RegisterForm(props) {
    const { setAction } = props;
    const [validated, setValidated] = useState(false);
    const [userData, setUserData] = useState(null);
    let md5 = require('md5');

    const baseUrl = useSelector(state => state.config.baseUrl);
    
    const registerUser = () => {
        axios.post(baseUrl + "/users/new", userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            setAction("login");
            console.log(response.data);
        }).catch((error) => {
            console.log(error.response.data);
        })
    }

    const setValue = (key, newValue) => {
        const _userData = { ...userData }
        _userData[key] = newValue
        setUserData(_userData)
    }

    const validateConfirmPW = (confirmPw) => {
        const password = userData.password;
        if (password !== confirmPw) {
            alert("Passwords do not match");
        } else {
            setValue("password", md5(password));
        }
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        } else {
            event.preventDefault();
            event.stopPropagation();
            registerUser();
        }
    }

    return (
        <Form noValidate validated={validated} >
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter first name" onChange={(event) => setValue("first_name", event.target.value)} required />
                    </Col>
                    <Col>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter last name" onChange={(event) => setValue("last_name", event.target.value)} required />
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(event) => setValue("email", event.target.value)} required />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Col>
                    <Col>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" onChange={(event) => setValue("username", event.target.value)} required />
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(event) => setValue("password", event.target.value)} required />
                    </Col>
                    <Col>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" onBlur={(event) => validateConfirmPW(event.target.value)} required />
                    </Col>
                </Row>
            </Form.Group>

            <Button className='mt-5 w-50' variant="primary" type="submit" onClick={handleSubmit}>
                Register
            </Button>
            <Row>
                <Button variant="link" onClick={() => setAction("login")}>
                    <h6>Already have an account? Login</h6>
                </Button>
            </Row>
        </Form>
    )
}

export default RegisterForm;