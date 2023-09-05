import React, { useEffect, useState } from 'react';
import './Auth.css'; // Import the CSS file
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
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

      const oldUser = localStorage.getItem("users");
      const oldUserData = JSON.parse(oldUser);
      // debugger
      let exist = false;

      if(oldUserData){
        for(var i in oldUserData){
          if(oldUserData[i].email === users.email){
            exist =  true;
            localStorage.setItem("current", users.email);
            toast.success("Signed in successfully!")
            navigate('/roomlist')
            setEmail('');
            setPassword('');
          }
        }
        if(!exist){
          toast.error("User not registered!")
        }
      }
  }
    // Reset error messages
    setEmailError('');
    setPasswordError('');
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <form className="auth-form" onSubmit={handleLogin}>
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
            Login
          </button>
        </form>
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
