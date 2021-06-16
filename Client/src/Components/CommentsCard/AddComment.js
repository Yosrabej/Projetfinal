import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../Redux/actions/posts";

function AddComment({ history }) {
    const post = useSelector((state) => state.postReducer.post);
    const user = useSelector((state) => state.userReducer.user);

    const [newComment, setNewComment] = useState("");
    const dispatch = useDispatch();
    // const handleChange = (e) => {
    //     setNewComment({ ...newComment, [e.target.name]: e.target.value });
    // };
    const handleChange = (input) => {
        setNewComment(input);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            addComment({ text: newComment }, post._id, user.name, history)
        );
        // dispatch(getComment(user._id));
    };

    return (
        <div>
            <center>
                <div style={{ marginTop: "70px" }}>
                    <input
                        type="text"
                        placeholder="Add comment...."
                        onChange={(e) => handleChange(e.target.value)}
                        style={{
                            borderRadius: "10px",
                            height: "40px",
                            width: "500px",
                        }}
                    />
                    <Button
                        style={{
                            marginLeft: "0.5%",
                            backgroundColor: "	#FF7F50	",
                            border: "none",
                        }}
                        onClick={handleSubmit}
                    >
                        Add
                    </Button>
                </div>
            </center>
        </div>
    );
}

export default AddComment;
