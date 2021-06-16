import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRecipe } from "../../Redux/actions/posts";

function Test() {
    const post = useSelector((state) => state.postReducer.post);
    const [editpost, setEditpost] = useState(post.title);
    const [editable, setEditable] = useState(false);
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setEditpost({ ...editpost, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateRecipe(post._id, editpost));
        setEditable(false);
    };

    useEffect(() => {
        dispatch(updateRecipe(post));
    }, [dispatch, post]);
    return (
        <div>
            {editable ? (
                <form onSubmit={handleSubmit}>
                    <input
                        name="title"
                        type="text"
                        value={editpost}
                        onChange={handleChange}
                    />
                </form>
            ) : (
                <h3>text:{post.title}</h3>
            )}

            <button onClick={() => setEditable(!editable)}>Edit</button>
        </div>
    );
}

export default Test;
