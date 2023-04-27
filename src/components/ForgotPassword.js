import React, { useState } from 'react';

function ForgotPassword() {
    const [email, setEmail] = useState('');
   
    const [emailError, setEmailError] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // handle login logic here
      
      console.log(email);
    };
  
    const validateEmail = (email) => {
      // email validation regex
      const re = /\S+@\S+\.\S+/;
      if (!re.test(email)) {
        setEmailError('Invalid email format');
      } else {
        setEmailError('');
      }
    };
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
      validateEmail(e.target.value);
    };
  return (
    <div className='box'>
        <h3>Forgot Password</h3>
        <form onSubmit={handleSubmit}>
        <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
        {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
      </label>
      <button type="submit" disabled={emailError}>Send Verification code</button>
      <h6><a href="Login" >go back to login!</a></h6>
      </form>
    </div>
  )
}

export default ForgotPassword