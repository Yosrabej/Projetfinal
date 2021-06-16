import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createRecipe } from "../../Redux/actions/posts";
import "./AddPage.css";
function AddPage() {
    const [post, setPost] = useState({});
    let history = useHistory();
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createRecipe(post, history));
    };
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "30px",
            }}
        >
            <small>Enter steps and click button "Add"</small>

            <div>
                <h1>Add a recipe</h1>
                <p>
                    <input
                        name="title"
                        type="text"
                        placeholder="recipe's name"
                        onChange={handleChange}
                    />
                </p>
                {/* <img
                    src={post.img} //todo: upload img
                    alt="post"
                    width="130"
                /> */}
                <input name="img" onChange={handleChange} />

                <p>
                    <textarea
                        rows="5"
                        cols="60"
                        name="ingredients"
                        placeholder="     Enter ingredients"
                        onChange={handleChange}
                    ></textarea>
                </p>
                <p>
                    <textarea
                        rows="5"
                        cols="60"
                        name="desc"
                        placeholder="     Enter steps here..."
                        onChange={handleChange}
                    ></textarea>
                </p>
            </div>
            <div>
                <p>
                    <input
                        name="name"
                        type="text"
                        placeholder="Your name"
                        onChange={handleChange}
                    />
                </p>

                <p>
                    <button
                        onClick={handleSubmit}
                        style={{
                            backgroundColor: "#FF7F50	",
                            border: "none",
                            width: "100px",
                            height: "50px",
                        }}
                    >
                        <h4>Add</h4>
                    </button>
                </p>
            </div>
        </div>
    );
}

export default AddPage;
