// import types

const {
    REGISTER_USER,
    LOGIN_USER,
    FAIL_USER,
    LOAD_USER,
    CURRENT_USER,
    LOGOUT_USER,
    UPDATE_USER,
    GET_USER,
    GET_ALL,
    DELETE_USER,
    ADD_TO_FAVORITES,
} = require("../Constants/user");

// initialstate
const initialState = {
    users: [],
    user: {},
    errors: [],
    isAuth: false,
    load: false,
    favorites: [],
};

// pure function=> (state, {type,payload})=>
const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOAD_USER:
            return { ...state, load: true };
        //   payload:{token , msg , user }
        case REGISTER_USER:
            localStorage.setItem("token", payload.token);
            return { ...state, user: payload.user, load: false, isAuth: true };
        //   payload: {token , msg , user}
        case LOGIN_USER:
            localStorage.setItem("token", payload.token);
            return { ...state, user: payload.user, load: false, isAuth: true };
        case FAIL_USER:
            return { ...state, errors: payload, load: false };
        case CURRENT_USER:
            return { ...state, user: payload.user, isAuth: true };
        case LOGOUT_USER:
            localStorage.removeItem("token");
            return { ...state, user: {}, isAuth: false };
        case "VIDE_ERRORS":
            return { ...state, errors: [] };
        case UPDATE_USER:
            return {
                ...state,
                user: payload.user,
                isAuth: true,
            };
        case GET_USER:
            return { ...state, user: payload, isAuth: true };
        case GET_ALL:
            return { ...state, load: false, users: payload.users };
        case DELETE_USER:
            return { ...state, isAuth: false, user: {} };
        case ADD_TO_FAVORITES:
            return {
                ...state,
                favorites: [...state.favorites, payload],
                load: false,
            };
        default:
            return state;
    }
};

export default userReducer;
