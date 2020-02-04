import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import '../styles/dashboard.css'
class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
render() {
    const { user } = this.props.auth;
  return (
    <div className="content-area">
      <div className="container">
        <nav>
          <ul>
            <li>
              <Link to="/publish">Publicar</Link>
            </li>
          </ul>
          <button onClick={this.onLogoutClick} className="logout_btn">
            Cerrar sesión
          </button>    
        </nav>
        <h4>
          Hola {user.name.split(" ")[0]} 
        </h4>
      </div>
    </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);