import {
    GET_POSTS
} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
    isAuthenticated: false,
    post: {},
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
        return {
            ...state,
            isAuthenticated: !isEmpty(action.payload),
            post: action.payload
        };
        default:
        return state;
    }
}