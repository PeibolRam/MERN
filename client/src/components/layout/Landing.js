import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../styles/landing.css'

class Landing extends Component {
  render() {
    return (
      <div className="content-area">
        <div className="container">
          <h4>Intra Share Playcity</h4>
          <div className="btns">
            <Link to="/register">
              Registrate
            </Link>
            <Link to="/login">
              Log In
            </Link>
          </div>
        </div>
      </div>  
    );
  }
}
export default Landing;