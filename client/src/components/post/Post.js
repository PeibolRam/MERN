import React, { Component } from "react";
import { addPost } from '../../actions/postActions';
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import '../styles/post.css'

class Post extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            content: "",
            date: "",
            filePost: ""
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit = e => {
        const { user } = this.props.auth;
        e.preventDefault();
        const newPost = {
            username: user.name,
            content: this.state.content,
            date: this.state.date,
            filePost: this.state.filePost
        }
        //window.location.reload();
        this.props.addPost(newPost, this.props.history); 
        console.log(newPost)
     }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });

    };

    onChangeFile = e => {
        this.setState({ filePost: e.target.files[0]});
    };

    render() {
        return (
            <div className="new_post">
                <form noValidate onSubmit={this.onSubmit} method="post"  encType="multipart/form-data">
                    <label>Crea una publicación: </label>
                    <textarea
                        onChange={this.onChange}
                        id="content"
                        type="text"
                        value={this.state.content}
                        placeholder="Cuentanos"
                    /> 
                    <input type="file" id="filePost" onChange={this.onChangeFile}/>
                    <button type="submit">Publicar</button>
                </form>
            </div>
            
        )
    }
}

Post.propTypes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    ports: state.post,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { addPost }
)(withRouter(Post));