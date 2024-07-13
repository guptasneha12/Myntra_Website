import React, { useEffect, useState } from 'react';
import logo from "../img/logo.png";
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // toast functions to display any error 
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  // email regex
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  // password regex
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const postData = () => {
    // checking email
    if (!emailRegex.test(email)) {
      notifyA("Invalid Email");
      return;
    }
    // checking password
    else if (!passRegex.test(password)) {
      notifyA("Please enter a valid password. It must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long.");
      return;
    }

    // sending data to server
    fetch("http://localhost:5000/signup", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        userName: userName,
        email: email,
        password: password
      })
    }).then(res => res.json())
      .then(data => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB(data.message);
          navigate("/signin");
        }
        console.log(data);
      })
  };

  return (
    <div className='signUp'>
      <div className='form-container'>
        <div className="form">
          <img className="signUplogo" src={logo} alt="" />
          <p className='loginPara'> Your Fashion Journey Starts Here <br />– Create an Account!</p>
          <div>
            <input type='email' name='email' id="email" value={email} placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} />
          </div>
          <div>
            <input type='text' name='name' id="name" value={name} placeholder='Full Name' onChange={(e) => { setName(e.target.value) }} />
          </div>
          <div>
            <input type='text' name='username' id="username" value={userName} placeholder='Username' onChange={(e) => { setUserName(e.target.value) }} />
          </div>
          <div>
            <input type='password' name='password' id="password" value={password} placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} />
          </div>
          <p className='loginPara' style={{ fontSize: "12px", margin: "3px 0px" }}>
            By signing up, you agree to our Terms, <br /> privacy policy and cookies policy.
          </p>
          <input type='submit' id='submit-btn' value="Sign Up" onClick={() => { postData() }} />
        </div>

        <div className='form2'>
          Already have an account?
          <Link to="/signin"><span style={{ color: "blue", cursor: "pointer" }}> Sign In</span></Link>
        </div>
      </div>
    </div>
  )
}
