import {
    LOAD_POST,
    FAIL_POST,
    CREATE_RECIPE,
    GET_ALL,
    GET_ONE,
    UPDATE_RECIPE,
    GET_COMMENT,
    DELETE_COMMENT,
    RATE_POST,
} from "../Constants/posts";
import axios from "axios";

//add a post
export const createRecipe = (post, history) => async (dispatch) => {
    dispatch({ type: LOAD_POST });
    try {
        let result = await axios.post("/api/posts/addpost", post);
        dispatch({ type: CREATE_RECIPE, payload: result.data });
        history.push("/");
    } catch (error) {
        dispatch({ type: FAIL_POST, payload: error.data });
        console.log("error", error);
        //erreur: data undefined
    }
};

// get all recipes
export const getRecipes = (posts) => async (dispatch) => {
    dispatch({ type: LOAD_POST });
    try {
        const res = await axios.get("/api/posts/all", posts);
        dispatch({ type: GET_ALL, payload: res.data });
    } catch (error) {
        dispatch({ type: FAIL_POST, payload: error.data });
    }
};
//get a post
export const getRecipe = (id, history) => async (dispatch) => {
    console.log(id);

    dispatch({ type: LOAD_POST });
    try {
        let res = await axios.get(`/api/posts/${id}`);
        dispatch({ type: GET_ONE, payload: res.data.post });

        history.push(`/details/${id}`);
    } catch (error) {
        dispatch({ type: FAIL_POST, payload: error.data });
    }
};
//delete a recipe
export const deleteRecipe = (id, history) => async (dispatch) => {
    try {
        await axios.delete(`/api/posts/${id}`);

        dispatch(getRecipes());
        history.push("/");
    } catch (error) {
        console.log(error);
    }
};

//update a recipe
export const updateRecipe = (id, post, history) => async (dispatch) => {
    dispatch({ type: LOAD_POST });
    try {
        let result = await axios.put(`api/posts/${id}`, post);
        dispatch({ type: UPDATE_RECIPE, payload: result.data });
        history.push("/");
    } catch (error) {
        console.log(error);
    }
};

//addComment
export const addComment = (post, id, history) => async (dispatch) => {
    console.log("id", id);
    console.log("post", post);
    dispatch({ type: LOAD_POST });
    try {
        const config = {
            headers: { authorization: localStorage.getItem("token") },
        };
        await axios.post(`/api/posts/comment/${id}`, post, config);
        dispatch(getRecipe(id, history));
    } catch (error) {
        console.log(error);
        dispatch({ type: FAIL_POST, payload: error.data });
    }
};
//get comment
export const getComment = (id) => async (dispatch) => {
    dispatch({ type: LOAD_POST });
    try {
        let res = await axios.get(`/api/posts/${id}`);
        dispatch({
            type: GET_COMMENT,
            payload: res.data.post.comments.comment,
        });
    } catch (error) {
        dispatch({ type: FAIL_POST, payload: error.data });
    }
};

//delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
    dispatch({ type: LOAD_POST });
    try {
        function refreshPage() {
            window.location.reload();
        }
        let res = await axios.delete(
            `/api/posts/comments/${postId}/${commentId}`
        );
        dispatch({
            type: DELETE_COMMENT,
            payload: res.data,
        });
        refreshPage();
    } catch (error) {
        console.log(error);
    }
};
// rating
export const ratingPost = (id, rating) => async (dispatch) => {
    dispatch({ type: LOAD_POST });
    const config = {
        headers: {
            authorization: localStorage.getItem("token"),
        },
    };
    try {
        const result = await axios.post(
            `/api/posts/rating-add/${id}`,
            rating,
            config
        );
        dispatch({ type: RATE_POST, payload: result.data });
    } catch (error) {
        dispatch({ type: FAIL_POST, payload: error.data });
    }
};
