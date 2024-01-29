import { useState } from "react";
import { Button, Row, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { setPage } from '../../redux/pageSlice';
import { setAuthToken, setIsAuth } from '../../redux/configSlice';

function LoginForm(props) {

    const { setAction } = props;
    const [userData, setUserData] = useState(null);
    let md5 = require('md5');

    const baseUrl= useSelector(state => state.config.baseUrl);
    const dispatch= useDispatch();

    const setValue = (key, newValue)=>{
        const _userData = {...userData}
        _userData[key]=newValue
        setUserData(_userData)
    }

    const handleLogin = (event) => {
        event.preventDefault();
        event.stopPropagation();
        axios.post(baseUrl + "/users/login", userData,{
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((response)=>{
            console.log(response.data)
            dispatch(setAuthToken(response.data))
            dispatch(setIsAuth(true))
            dispatch(setPage("home"))
        }).catch((error) => {
            alert(error.response.data);
        })
    }

    return (
        <Form>
            <Form.Group className="w-75 mx-auto">

                <FontAwesomeIcon icon={faUser}/>
                <Form.Label className='mt-4 ms-1'>Username: </Form.Label>
                <Form.Control
                    className="text-center"
                    required
                    placeholder="Enter Username"
                    onChange={(event)=>setValue('username',event.target.value)}
                />

                <FontAwesomeIcon icon={faLock}/>
                <Form.Label className='mt-4 ms-1'>Password: </Form.Label>
                <Form.Control
                    className="text-center"
                    type='password'
                    required
                    placeholder="Enter Password"
                    onChange={(event)=>setValue('password', md5(event.target.value))}
                />
            
                <Button variant="outline-primary" type='submit' className='mt-5 w-25' onClick={handleLogin}>
                    Log in
                </Button>

                <Row>
                    <Button variant="link" onClick={()=> setAction("register")}>
                        <h6>Not registered? You can register here!</h6>
                    </Button>
                </Row>

            </Form.Group>
        </Form>
        
    );
}

export default LoginForm;

