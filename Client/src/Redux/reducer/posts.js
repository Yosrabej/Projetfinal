// import types
const {
    CREATE_RECIPE,
    LOAD_POST,
    FAIL_POST,
    GET_ALL,
    GET_ONE,
    UPDATE_RECIPE,
    ADD_COMMENT,
    GET_COMMENT,
    DELETE_COMMENT,
    RATE_POST,
} = require("../Constants/posts");

//initialState
const initialState = {
    post: {},
    posts: [],
    errors: null,
    isAuth: false,
    load: false,
    comments: [],
    comment: {},
    ratings: [],
    rating: {},
};
// pure function=> (state, {type,payload})=>
const postReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOAD_POST:
            return { ...state, load: true };
        case CREATE_RECIPE:
            return { ...state, post: payload.post, load: false, isAuth: true };
        case FAIL_POST:
            return { ...state, errors: payload, load: false };
        case GET_ALL:
            return { ...state, load: false, posts: payload.posts };
        case GET_ONE:
            return { ...state, load: false, post: payload };
        case UPDATE_RECIPE:
            return { ...state, post: payload.post, isAuth: true };
        case ADD_COMMENT:
            return {
                ...state,
                comments: [
                    { ...state.comments, comment: payload.comments.comment },
                ],
                load: false,
                iAuth: true,
            };
        case GET_COMMENT:
            return { ...state, load: false, post: payload };
        case DELETE_COMMENT:
            return { ...state, isAuth: false, comment: {} };
        case RATE_POST:
            return {
                ...state,
                ratings: [{ ...state.ratings, rating: payload.ratings.rating }],
                load: false,
                iAuth: true,
            };
        default:
            return state;
    }
};
export default postReducer;
