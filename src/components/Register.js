
import React, { useEffect, useState } from 'react';
import axios from "axios";

function Register() {
  const [values, setValues] = useState({
    userName: "",
    firstName: "",
    lastname: "",
    gender: "",
    dateOfBirth: "",
    mobileNumber: "",
    role: 0,
    password: "",
    conformPassword: ""
  });
  const [userName,setUserName]=useState();
  const [Name ,setName]=useState({
    firstName: "",
    lastname: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const currentDate = new Date();
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(values));
    setIsSubmit(true);
    const errors = validate(values);
    console.log(values);
    if(Object.keys(errors)===0){
      axios
      .post(`http://localhost:9191/Login/register`,values)
      .then((response)=>{
      console.log(response.data);
      window.alert(response.data);
       })
     .catch((err)=>{
      alert(err.message);
      
    })
      }
  };
  useEffect(() => {
   // console.log(errors);
    if (Object.keys(errors).length === 0 && isSubmit) {
       console.log(errors);
}}, [errors]);
const handleChange = (event) => {
  const { name, value } = event.target;
  setValues({ ...values,role: parseInt(value), [name]: value });
   //Clear the error message of the field being edited
  setErrors({ ...errors, [name]: '' });
  
};

  const validate = (values) => {
    let errors = {};
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;
    const emailRegex= /\S+@\S+\.\S+/;
    const phoneNumberRegex =/^[+0-9][-0-9 \d]{7,}$/; 
    const nameRegex=/^[a-zA-Z]{3,20}$/;
    if (!values.userName) {
      errors.userName ="email is required";
    }else if(!emailRegex.test(values.userName)){
      errors.userName="enter valid email"
    }

    if (!values.firstName) {
      errors.firstName = "First name is required";
    }else if(!nameRegex.test(values.firstName)){
      errors.firstName="enter valid first name"
    }

    if (!values.lastname) {
      errors.lastname = "Last name is required";
    }else if(!nameRegex.test(values.lastname)){
      errors.lastname="enter valid first name"
    }

    if (!values.gender) {
      errors.gender = "Gender is required";
    }

    if (!values.dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required";
    }else if(values.dateOfBirth>= currentDate){
      errors.dateOfBirth = "dob should be from past";
    }

    if (!values.mobileNumber) {
      errors.mobileNumber = "Mobile number is required";
    }else if(!phoneNumberRegex.test(values.mobileNumber)){
      errors.mobileNumber = "enter valid mobile number";
    }
    if (!values.role) {
      errors.role = "Role is required";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(values.password)) {
      errors.password = "Password must be 6-20 characters long, contain at least one number, one letter, and one special character.";
    }

    if (!values.conformPassword) {
      errors.conformPassword = "Confirm password is required";
    } else if (values.password !== values.conformPassword) {
      errors.conformPassword = "Passwords do not match";
    }

    return errors;
  };
  const validateEmail = (email) => {
    // email validation regex
    const re = /\S+@\S+\.\S+/;
    if (!email) {
      errors.userName=('email is required');
    } else if(!re.test(email)) {
      errors.userName=('Invalid email format');
    }else{
      errors.userName=('');
    }
  };

  const handleEmailChange = (e) => {
    setValues(prevValues => ({
      ...prevValues,
      userName: (e.target.value)
    }));
    validateEmail(e.target.value);
  };
  const validateMobileNumber = (mobileNumber) => {
    // email validation regex
    const phoneNumberRegex =/^[+0-9][-0-9 \d]{7,}$/; 
    if (!values.mobileNumber) {
      errors.mobileNumber = "Mobile number is required";
    }else if(!phoneNumberRegex.test(values.mobileNumber)){
      errors.mobileNumber = "enter valid mobile number";
    }else{
      errors.mobileNumber = " ";
    }
    }

  const handleMobileNumberChange = (e) => {
    setValues(prevValues => ({
      ...prevValues,
      mobileNumber: (e.target.value)
    }));
    validateMobileNumber(e.target.value);
  };
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;
    if (!values.password) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(values.password)) {
      errors.password = "Password must be 6-20 characters long, contain at least one number, one letter, and one special character.";
    }else{
      errors.password =" ";
    }
    };
    const handlePasswordChange = (e) => {
      setValues(prevValues => ({
        ...prevValues,
        password: (e.target.value)
      }));
      validatePassword(e.target.value);
    };
 

  return (
    <div className='box'>
      <form className="forms"onSubmit={handleSubmit}>
        <h3>Register</h3>
        <div>
          <label className='labels'htmlFor="userName">UserName/EmailId</label>
          <input className='inputs' type="email" id="userName" name="userName" value={values.userName} autoComplete="off"  onChange={handleEmailChange} placeholder="Email" />
          <br></br>
          {errors.userName && <span className="error">{errors.userName}</span>}
        </div>
        <div className='parent'>
          <div className='child'>
          <label className='labels'htmlFor="firstName">First Name</label>
          <input className='inputs' type="text" id="firstName" name="firstName" value={values.firstName} autoComplete="off" onChange={handleChange} style={{width: '85px'}} placeholder="FirstName"  />
          <br></br>
          {errors.firstName && <span className="error">{errors.firstName}</span>}
          
          </div>
          <div className='child'>
          <label  className='labels'htmlFor="lastname">Last Name</label>
          <input className='inputs' type="text" id="lastname" name="lastname" value={values.lastname} autoComplete="off"  onChange={handleChange}  style={{width: '85px'}} placeholder="LastName"/>
          <br></br>
          {errors.lastname && <span  className="error">{errors.lastname}</span>}
          </div>
          </div>
          <div>
          <label className='labels' htmlFor="mobileNumber">mobileNumber</label>
          <input className='inputs' type="text" id="mobileNumber" name="mobileNumber" value={values.mobileNumber} autoComplete="off"  onChange={handleMobileNumberChange} placeholder="MobileNumber"/>
          <br></br>
          {errors.mobileNumber && <span  className="error">{errors.mobileNumber}</span>}
        </div>
      <div className='parent'>
        <div className='child'>
          <label className='labels'htmlFor="gender">Gender</label>
          <select id="gender" name="gender" value={values.gender} onChange={handleChange}  style={{width: '85px',height:"25px"}}>
          <option value="select">Select</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            </select>
            <br></br>
            {errors.gender && <span  className="error">{errors.gender}</span>}
        </div>
        <div className='child'>
          <label className='labels' htmlFor="role">Role</label>
          <select id="role" name="role" value={values.role} onChange={handleChange}  style={{width: '85px',height:"25px"}}>
          <option value="select">Select</option>
          <option value="1">Author</option>
          <option value="0">Admin</option>
            </select>
            <br></br>
            {errors.role && <span  className="error">{errors.role}</span>}
        </div>
        
        </div>
        <div>
          <label className='labels' htmlFor="dob">DOB</label>
          <input className='inputs' type="date" id="dob" name="dateOfBirth" value={values.dateOfBirth} onChange={handleChange}  style={{width: '200px'}}/>
          <br></br>
          {errors.dateOfBirth && <span className="error">{errors.dateOfBirth}</span>}
        </div>
        
        <div>
          <label className='labels'htmlFor="password">Password</label>
          <input className='inputs' type="password" id="password" name="password" value={values.password} autoComplete="off"  onChange={handlePasswordChange} placeholder="password" />
          <br></br>
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div>
          <label className='labels' htmlFor="conformPassword">conformPassword</label>
          <input className='inputs' type="password" id="conformPassword" name="conformPassword" value={values.conformPassword} autoComplete="off"  onChange={handleChange} placeholder="conformPassword" />
          <br></br>
          {errors.conformPassword && <span className="error">{errors.conformPassword}</span>}
        </div>
        <button type="submit" >submit</button>
        <h6><a href="Login" >go back to login!</a></h6>
       </form>
      </div> 
       )
      }
      
      export default Register