import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Post from '../post/Post';
import axios from 'axios';
import '../styles/home.css'
class Home extends Component {

    constructor() {
        super();
        this.state = {
            arr: []
        };
    }
       
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    posts = () => {
        axios.get('/api/post/all')
        .then( (response) => {
            this.setState({arr: response.data})
          })
         .catch(function (error) {
            console.log(error);
         });
    }

    componentWillMount(){
        this.posts();   
    }

    render() {
        const { user } = this.props.auth;
        return (
            <div className="content-area">
                <div className="container">
                     <button onClick={this.onLogoutClick} className="logout_btn">
                        Cerrar sesión
                    </button> 
                    <h4>Hola {user.name.split(" ")[0]}</h4>
                    <Post />
                    {this.state.arr.reverse().map((postsP) => { 
                        return (
                            <div key={postsP._id} className="post">
                                <div className="post_info">
                                    <p>{postsP.username}</p>
                                    <p>{postsP.date}</p>
                                </div>
                                <p>{postsP.content}</p>
                            </div>
                            
                        )
                    })}
                      
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    arr: state.arr
});

export default connect(
    mapStateToProps,
    { logoutUser }
  )(Home);