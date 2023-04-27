import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import axios from "axios";

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
});

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError('email is required');
    } else {
      setEmailError('');
    }
    if (!password) {
      setPasswordError('password is required');
    } else {
      setPasswordError('');
    }

    if (emailError === '' && passwordError === '') {
      axios
        .get(`http://localhost:9191/Login/?email=${email}&password=${password}`)
        .then((response) => {
          console.log(response.data);
          localStorage.setItem('status', 'true');
          localStorage.setItem('role', response.data.role);
          localStorage.setItem('userName', response.data.userName);
          localStorage.setItem('name', response.data.name);
          localStorage.getItem('mobileNumber', response.data.mobileNumber);
          if (response.data.Message === 'Enter valid details') {
            alert(response.data.Message);
          } else {
            alert('login successful');
          }
        })
        .catch((err) => {
         alert(err.Message)
        });
    }
  };

  const validateEmail = (email) => {
    // email validation regex
    const re = /\S+@\S+\.\S+/;
    if (!email) {
      setEmailError('email is required');
    } else if (!re.test(email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError('password is required');
    } else {
      setPasswordError('');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  return (
    <div className='box'>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}/>
      <StyledForm onSubmit={handleSubmit}>
        <h3>Login</h3>
        <TextField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          error={!!emailError}
          helperText={emailError}
          autoComplete="off"
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          error={!!passwordError}
          helperText={passwordError}
        
        />
        <Button type="submit" variant="contained" disabled={emailError || passwordError}>
          Login
        </Button>
      </StyledForm>
      <h6>
        New User? <a href="Register"> SignUp </a> here! 
      </h6>
      <h6>
      <a href="ResetPassword">reset password</a>
      </h6>
     
   
      </div>
  );
}

export default LoginForm;
