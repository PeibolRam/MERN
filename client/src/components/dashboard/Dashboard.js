import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
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
        <h4>
          Kiubule pinche {user.name.split(" ")[0]} ya te logiastes
        </h4>
        <button onClick={this.onLogoutClick} className="logout_btn">
          Cerrar sesión
        </button>
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