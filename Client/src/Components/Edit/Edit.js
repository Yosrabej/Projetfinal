import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, updateUser } from "../../Redux/actions/user";
import { useHistory } from "react-router-dom";
import "./EditRecipe.css";
function Edit() {
    const user = useSelector((state) => state.userReducer.user);
    const [edituser, setEdituser] = useState({});
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setEdituser({ ...edituser, [e.target.name]: e.target.value });
    };
    let history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(user._id, edituser, history));
    };
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteUser(user._id, history));
        alert("your account is deleted");
    };
    useEffect(() => {
        dispatch(updateUser(user));
    }, [dispatch, user]);
    return (
        <center>
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
                        name="name"
                        type="text"
                        placeholder="new name"
                        onChange={handleChange}
                    />
                </div>
                <div style={{ paddingBottom: "30px" }}>
                    <input
                        name="password"
                        type="text"
                        placeholder="new password"
                        onChange={handleChange}
                    />
                </div>
                <div style={{ paddingBottom: "30px" }}>
                    <input
                        name="profilePic"
                        placeholder="img url"
                        onChange={handleChange}
                    />
                </div>
                <button
                    style={{
                        backgroundColor: "#f9aba4",
                        border: "none",
                        boxShadow: "20px 20px 50px grey",
                        marginBottom: "30px",
                    }}
                    onClick={handleSubmit}
                >
                    Change
                </button>
                <br />
                <button
                    style={{
                        backgroundColor: "#f9aba4",
                        border: "none",
                        boxShadow: "20px 20px 50px grey",
                    }}
                    onClick={handleDelete}
                >
                    Delete my account
                </button>
            </div>
        </center>
    );
}

export default Edit;
