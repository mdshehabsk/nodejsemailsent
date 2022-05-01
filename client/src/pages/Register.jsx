import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
  let history = useHistory()
  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setemailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cpasswordError, setcPasswordError] = useState("");
  // const [error, setError] = useState("");
  const inputChange = async (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const RegisterSubmit = async (e) => {
    try{
      e.preventDefault();
    const post = await axios.post("http://localhost:8000/register", value);
    console.log(post)
    const err = post.data;
    if(err.success){
      toast.success(err.message);
      setTimeout(() => {
        history.push('/')
      }, 2000);
    }
    
    if (err.path) {
      err.path.forEach((elem) => {
        elem ==='username' ? setUsernameError(err.message) : setUsernameError('')
        elem ==='email' ? setemailError(err.message) : setemailError('')
        elem === 'password' ? setPasswordError(err.message) : setPasswordError('')
        elem === 'cpassword' ? setcPasswordError(err.message) : setcPasswordError('')
      });
    }
      
    }catch(err){
      console.log(err)
    }
    
    
  };

  const { username, email, password, cpassword } = value;
  return (
    <>
      <div className="container">
        <div className="login">
          <form autoComplete="off" onSubmit={RegisterSubmit}>
            <input
              onChange={inputChange}
              type="text"
              name="username"
              value={username}
              placeholder="Username"
            />
              <p className="error error-username"> {usernameError} </p>
            <br />
            <input
              onChange={inputChange}
              type="text"
              name="email"
              value={email}
              placeholder="Email"
            />
            <p className="error error-email"> {emailError} </p>
            <br />
            <input
              onChange={inputChange}
              type="password"
              name="password"
              value={password}
              placeholder="Password"
            />
            <p className="error error-password"> {passwordError} </p>
            <br />
            <input
              onChange={inputChange}
              type="password"
              name="cpassword"
              value={cpassword}
              placeholder="Confirm password"
            />
            <p className="error error-cpassword"> {cpasswordError} </p>
            <br />
            <input type="submit" value="Register" className="btn" />
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Register;
