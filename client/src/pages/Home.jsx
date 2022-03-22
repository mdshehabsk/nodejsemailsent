import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Home() {
  const [value, setValue] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  const formSubmit = async (e) => {
    e.preventDefault();
    const { username, email, phone, password, cpassword } = value;
    fetch("https://nodejsemailsent.herokuapp.com/api/v1/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        phone,
        password,
        cpassword,
      }),
    })
      .then((data) => data.json())
      .then((actualData) => toast(actualData.message))
      .catch((err) => console.log(err));
  };
  const inputChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const { username, email, phone, password, cpassword } = value;
  return (
    <>
      <div className="form">
        <div className="container">
          <h1>Register</h1>
          <form method="POST" onSubmit={formSubmit}>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Username
              </label>
              <input
                name="username"
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={inputChange}
                value={username}
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                name="email"
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={inputChange}
                value={email}
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Phone number
              </label>
              <input
                name="phone"
                type="number"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={inputChange}
                value={phone}
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                name="password"
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={inputChange}
                value={password}
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Confirm password
              </label>
              <input
                name="cpassword"
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={inputChange}
                value={cpassword}
              />
            </div>
            {/* <div className="mb-3 form-check">
            <input
              name="checkbox"
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              onChange={inputChange}
            />
            <label className="form-check-label" for="exampleCheck1"
              >Agree terms and condition</label
            >
          </div> */}
            <button type="submit" className="btn btn-success">
              Submit
            </button>
            <li>you have already a account?<a href="">Login</a></li>
          </form>
        </div>
      </div>
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      ></ToastContainer>
    </>
  );
}

export default Home;
