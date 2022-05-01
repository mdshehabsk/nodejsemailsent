import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav>
        <div className="container">
          <div className="nav-wrapper">
            <div className="logo">
              <Link to='/'>Logo</Link>
            </div>
            <ul>
              <li>
  
                <Link to='/register' >Registration</Link>
              </li>
              <li>

                <Link to='/login' >Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
