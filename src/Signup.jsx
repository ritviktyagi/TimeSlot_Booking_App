import React, { useState } from 'react';
import './Auth.css'; // Import the CSS file
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Basic email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Invalid email address');
      return;
    }

    // Basic password validation (at least 6 characters)
    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    if((email || /^\S+@\S+\.\S+$/.test(email)) && (password || password.length >= 6)){
        const users = {
            email: email,
            password: password
        };

        let arr = [];
        const oldUser = localStorage.getItem("users");
        const oldUserData = JSON.parse(oldUser);
        // debugger
        let exist = false;

        if(oldUserData){
          for(var i in oldUserData){
            if(oldUserData[i].email === users.email){
              exist = true;
              toast.error("User already exist!")
              return false
            }
          }
          if(!exist){
            arr = oldUserData
          }
        }
        arr.push(users);
        localStorage.setItem("users", JSON.stringify(arr));
        localStorage.setItem("current", users.email);
        setEmail('');
        setPassword('');
        toast.success("Account Created!")
        navigate("/roomlist")
    }

    // Reset error messages
    setEmailError('');
    setPasswordError('');
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>
        <form className="auth-form" onSubmit={handleSignup}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
            />
            <p className="error-message">{emailError}</p>
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
            />
            <p className="error-message">{passwordError}</p>
          </div>
          <button className="auth-button">
            Sign Up
          </button>
        </form>
        <p>
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
