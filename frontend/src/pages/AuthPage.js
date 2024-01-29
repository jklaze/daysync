import { useState } from 'react';
import { Card } from 'react-bootstrap';

import LoginForm from '../components/Forms/LoginForm';
import RegisterForm from '../components/Forms/RegisterForm';

function AuthPage(props) {
  const { action } = props;
  const [authAction, setAuthAction] = useState(action);

  const handleAuthAction = () => {
    switch (authAction) {
      case "login":
        return (
          <>
            <Card.Title className='mb-4'><h2>Login</h2></Card.Title>
            <LoginForm setAction={setAuthAction} />
          </>
        )
      case "register":
        return (
          <>
            <Card.Title className='mb-4'><h2>Register</h2></Card.Title>
            <RegisterForm setAction={setAuthAction} />
          </>
        )
      default:
        return (
          <>
            <Card.Title className='mb-4'><h2>Login</h2></Card.Title>
            <LoginForm setAction={setAuthAction} />
          </>
        )
    }
  };

  return (
    <div className="AuthPage">
      <Card className="p-4 w-75 mx-auto">
        { 
          handleAuthAction()
        }
      </Card>
    </div>
  );
};

export default AuthPage;


