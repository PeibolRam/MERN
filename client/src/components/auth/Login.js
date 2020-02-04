import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import '../styles/login.css'
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/home"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  };
  render() {
    return (
      <div className="content-area">
        <div className="container">
          <h4>Login</h4>
          <div className="login_container">
            <form onSubmit={this.onSubmit}>
                <input onChange={this.onChange} value={this.state.email} id="email" type="email" />
                <label htmlFor="email">Email</label>
                <input onChange={this.onChange} value={this.state.password} id="password" type="password" />
                <label htmlFor="password">Contraseña</label>
                <button type="submit">
                  Login
                </button>
            </form>
          </div>  
          <p>
            ¿No tienes cuenta? <Link to="/register">Registrate</Link>
          </p>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);