import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [emailError, setemailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  let history = useHistory()
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const inputChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const LoginSubmit =async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:8000/login',value,{withCredentials:true})
    const data = res.data;
    if(data.success){
      toast.success(data.message)
      setTimeout(() => {
        history.push('/')
      }, 2000);
    }
    if (data.path) {
      data.path.forEach((elem) => {
        elem ==='email' ? setemailError(data.message) : setemailError('')
        elem === 'password' ? setPasswordError(data.message) : setPasswordError('')
      });
   }
  };
  const { email, password } = value;
  return (
    <>
      <div className="container">
        <div className="login">
          <form autoComplete="off" onSubmit={LoginSubmit}>
            <input
              value={email}
              onChange={inputChange}
              type="text"
              name="email"
              placeholder="Enter your Email"
            />
            <p className="error error-email"> {emailError} </p>
            <br />
            <input
              value={password}
              onChange={inputChange}
              type="password"
              name="password"
              placeholder="Enter your password"
            />
            <p className="error error-password"> {passwordError} </p>
            <br />
            <input type="submit" value="Login" className="btn" />
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

export default Login;
