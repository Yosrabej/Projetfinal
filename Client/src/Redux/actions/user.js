import {
    LOAD_USER,
    REGISTER_USER,
    FAIL_USER,
    LOGIN_USER,
    LOGOUT_USER,
    CURRENT_USER,
    GET_ALL,
    UPDATE_USER,
    GET_USER,
    DELETE_USER,
    ADD_TO_FAVORITES,
} from "../Constants/user";
import axios from "axios";

export const register = (user, history) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        let result = await axios.post("/api/user/register", user);
        dispatch({ type: REGISTER_USER, payload: result.data });
        history.push("/profile");
    } catch (error) {
        dispatch({ type: FAIL_USER, payload: error.response.data });
    }
};

export const login = (user, history) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        let result = await axios.post("/api/user/login", user);
        dispatch({ type: LOGIN_USER, payload: result.data });
        history.push("/profile");
    } catch (error) {
        dispatch({ type: FAIL_USER, payload: error.response.data.errors });
    }
};

export const current = () => async (dispatch) => {
    try {
        const config = {
            headers: { authorization: localStorage.getItem("token") },
        };
        let result = await axios.get("/api/user/current", config);
        dispatch({ type: CURRENT_USER, payload: result.data });
    } catch (error) {
        dispatch({ type: FAIL_USER, payload: error.response.data });
    }
};

export const logout = () => {
    return { type: LOGOUT_USER };
};

export const videErrors = () => {
    return {
        type: "VIDE_ERRORS",
    };
};
//get all users

export const getUsers = (users) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        const res = await axios.get("/api/user/users", users);
        dispatch({ type: GET_ALL, payload: res.data });
    } catch (error) {
        console.log(error);
        dispatch({ type: FAIL_USER, payload: error.data });
    }
};
//get user
export const getUser = (id) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        let res = await axios.get(`/api/user/${id}`);
        dispatch({ type: GET_USER, payload: res.data.user });
    } catch (error) {
        dispatch({ type: FAIL_USER, payload: error.data });
    }
};
//delete user
export const deleteUser = (id, history) => async (dispatch) => {
    try {
        let res = await axios.delete(`/api/user/${id}`);
        dispatch({ type: DELETE_USER, payload: res.data.user });
        history.push("/");
    } catch (error) {
        console.log(error);
    }
};
//update user
export const updateUser = (id, user, history) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        let result = await axios.put(`api/user/${id}`, user);
        dispatch({ type: UPDATE_USER, payload: result.data });
        history.push("/profile");
    } catch (error) {
        dispatch({ type: FAIL_USER, payload: error.data });
    }
};

//add a recipe to favorites
export const addToFavorites = (id, post) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        let result = await axios.put(`api/user/favorites/${id}`, post);
        dispatch({
            type: ADD_TO_FAVORITES,
            payload: result.data.user,
        });
    } catch (error) {
        console.log(error);
        dispatch({ type: FAIL_USER, payload: error.data });
    }
};
