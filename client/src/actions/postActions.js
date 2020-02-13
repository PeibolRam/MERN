import axios from "axios";
import {
  GET_ERRORS
} from "./types";

// Add post
export const addPost = (postData, history) => dispatch => {
  axios.post("/api/post/add", postData)
    .then(res => {
      history.push("/home")
    }) 
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};





