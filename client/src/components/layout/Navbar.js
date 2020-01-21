import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../styles/navbar.css'
class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
          <Link to="/">
            <img src="https://nyc3.digitaloceanspaces.com/dreamsengine/playcity/resources/uploads/2019/12/11105050/Logo-Play-01.png" alt="logo"/>
          </Link>
      </nav>
    );
  }
}
export default Navbar;