import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import axios from "axios";


const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
});
function PasswordResetForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [newPasswordError,setNewPasswordError]=useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError('email is required');
    }else{
      setEmailError('');
    }
    if (!password) {
      setPasswordError('password is required');
    } else{
      setPasswordError('');
    }
    if(!newPassword){
      setNewPasswordError('password is reqired');
    }else{
      setNewPasswordError('');
    }
     if(!confirmPassword){
      setConfirmPasswordError('conform password is reqired');
    }
    else{
      setConfirmPasswordError("");
    }

    
    if(passwordError=="" && emailError=="" && confirmPasswordError==""&& newPasswordError==""){
      axios
      .put(`http://localhost:9191/Login/resetpassword?email=${email}&password=${password}&newPassword=${newPassword} `)
      .then((response)=>{
      // alert(response.data)

      if(response.data.Message!==''){
        window.alert(response.data.Message)
      }
      else{
        alert(response.data)
      }
      })
    .catch((err)=>{
      console.log(err.message);
    })}
  };
    const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
      validateConfirmPassword(e.target.value);
    };
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
      validateEmail(e.target.value);
    };
    const handleNewPasswordChange = (e) => {
      setNewPassword(e.target.value);
      validateNewPassword(e.target.value);
    };


  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    if(!email){
      setEmailError('email is required');
    }
    else if (!re.test(email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };
  
  const validateNewPassword = (newPassword) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/;
    if(!newPassword){
      setNewPasswordError('password is reqired');
    }
    else if(newPassword===password){
      setNewPasswordError('new password cannot be your previous password');
    }
    else if (!re.test(password)) {
      setNewPasswordError('Password must be 6-20 characters long, contain at least one number, one letter, and one special character.');
    } else {
      setNewPasswordError('');
    }
  };
  const validateConfirmPassword = (confirmPassword) => {
   console.log(newPassword);
   console.log(confirmPassword)
     if(!(confirmPassword===newPassword)){
      console.log("jai")
      setConfirmPasswordError("passords did not match");
    }else if(!confirmPassword){
      setConfirmPasswordError('conform password is reqired');
    }
    else{
      setConfirmPasswordError("");
    }
  }
  const validatePassword = (password) => {
 
      if (!password) {
        setPasswordError('password is required');
      } else{
        setPasswordError('');
      }
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
      validatePassword(e.target.value);
    };
  
 


  return (
    <div className='box'>
       <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <StyledForm onSubmit={handleSubmit}>
      <h3>Reset Password</h3>
        <TextField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          error={Boolean(emailError)}
          helperText={emailError}
          autoComplete="off"
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          error={Boolean(passwordError)}
          helperText={passwordError}
        />
        <TextField
          id="newPassword"
          label="New Password"
          type="password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          error={Boolean(newPasswordError)}
          helperText={newPasswordError}
        />
        <TextField
          id="confirmPassword"
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          error={Boolean(confirmPasswordError)}
          helperText={confirmPasswordError}
        />
        <Button type="submit" variant="contained" disabled={emailError || newPasswordError || confirmPasswordError || passwordError}>
          Reset Password
        </Button>
      </StyledForm>
      <h6>
        <a href="Login">go back to login!</a>
      </h6>
    </Box>
    </div>
  );
}

export default PasswordResetForm;
