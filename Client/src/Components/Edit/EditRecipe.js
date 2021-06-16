import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRecipe } from "../../Redux/actions/posts";
import { useHistory } from "react-router-dom";
import "./EditRecipe.css";
function EditRecipe() {
    const post = useSelector((state) => state.postReducer.post);
    const [editpost, setEditpost] = useState({});
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setEditpost({ ...editpost, [e.target.name]: e.target.value });
    };
    let history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateRecipe(post._id, editpost, history));
    };

    useEffect(() => {
        dispatch(updateRecipe(post));
    }, [dispatch, post]);
    return (
        <center>
            {" "}
            <div
                className="backgroundedit"
                style={{
                    display: "block",
                    marginTop: "100px",
                    height: "400px",
                    width: "300px",
                    borderRadius: "10px",
                }}
            >
                <div style={{ paddingBottom: "30px", paddingTop: "60px" }}>
                    <input
                        name="title"
                        type="text"
                        placeholder="new title"
                        onChange={handleChange}
                    />
                </div>
                <div style={{ paddingBottom: "30px" }}>
                    <input name="image" placeholder="img url" />
                </div>
                <div style={{ paddingBottom: "30px" }}>
                    <input
                        name="ingredients"
                        type="text"
                        placeholder="enter ingredients"
                        onChange={handleChange}
                    />
                </div>
                <div style={{ paddingBottom: "30px" }}>
                    <input
                        name="desc"
                        type="text"
                        placeholder="new decription"
                        onChange={handleChange}
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    style={{
                        backgroundColor: "#f9aba4",
                        border: "none",
                        boxShadow: "20px 20px 50px grey",
                    }}
                >
                    Update
                </button>
            </div>
        </center>
    );
}

export default EditRecipe;
