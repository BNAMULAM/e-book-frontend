import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Nav() {
  const userStatus=localStorage.getItem("status");
  const userRole=localStorage.getItem("role");
  const userEmail=localStorage.getItem("userName");
  const userName=localStorage.getItem("name");
  const userMobileNumber=localStorage.getItem("mobileNumber");

  const navStyle = {
    color: "black",
  };
  return (
    <div>
    <nav className="nav">
     
       <h3 style={{color:"white"}}>EBook</h3>
      {
         (
          <ul className="nav-links">
             <Link  style={{navStyle,color:'white'}} to="/">
            <li> Home</li>
            </Link>
           
            <Link  style={{navStyle,color:'white'}} to="/login">
            <li>Login</li>
            </Link>
            <Link  style={{navStyle,color:'white'}} to="/register">
            <li>Register</li>
            </Link>
          </ul>
          )
      }
      {
        userRole==="ADMIN"?
        (
          <ul className="nav-links">
             
           <h7 style={{color:"white"}}>{userName}</h7>
            <Link  style={{navStyle,color:'white'}} to="/login">
            <li>view Request</li>
            </Link>
            <Link  style={{navStyle,color:'white'}} to="/register">
            <li>View Ebooks</li>
            </Link>
            <Link  style={{navStyle,color:'white'}} to="/Logout">
            <li>Logout</li>
            </Link>
          </ul>
        ) :null 
      }
      {
        userRole==="AUTHOR"?
        (
          <ul className="nav-links">
             {/* <Link  style={{navStyle,color:'white'}} to="/">
            <li> Home</li>
            </Link> */}
           
            {/* <Link  style={{navStyle,color:'white'}} to="/login">
            <li>Login</li>
            </Link> */}
            <Link  style={{navStyle,color:'white'}} to="/register">
            <li>Register</li>
            </Link>
            <Link  style={{navStyle,color:'white'}} to="/Logout">
            <li>Logout</li>
            </Link>
          </ul>
        ) :null 
      }
     
   
 
    </nav>
    </div>
  );
}

export default Nav;

