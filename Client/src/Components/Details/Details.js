import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { deleteRecipe, getRecipe } from "../../Redux/actions/posts";
import AddComment from "../CommentsCard/AddComment";
import CommentsList from "../CommentsCard/CommentsList";

function Details({ match }) {
    const post = useSelector((state) => state.postReducer.post);
    const user = useSelector((state) => state.userReducer.user);
    // const isAuth = useSelector((state) => state.userReducer.isAuth);
    const dispatch = useDispatch();
    let history = useHistory();
    const token = localStorage.getItem("token");

    useEffect(() => {
        dispatch(getRecipe(match.params.id));
        console.log("x", match.params.id);
    }, []);

    return (
        <section>
            <div
                style={{
                    marginLeft: "40px",
                    marginRight: "40px",
                    marginTop: "40px",
                }}
            >
                <h1 style={{ textAlign: "center", marginTop: "10px" }}>
                    {post.title}
                </h1>

                <div
                    style={{
                        display: "flex",

                        marginTop: "10px",
                    }}
                >
                    <div className="imgbtn">
                        <img
                            src={post.img}
                            alt="recipe img"
                            style={{
                                width: "300px",
                                height: "300px",
                                borderRadius: "10%",
                                marginTop: "20px",
                            }}
                        />
                        <div>
                            {token ? (
                                <Link to="/editrecipe">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="40"
                                        height="40"
                                        fill="currentColor"
                                        class="bi bi-pencil-square"
                                        viewBox="0 0 16 16"
                                        style={{
                                            marginTop: "15px",
                                            marginLeft: "20px",
                                            color: "#FF7F50",
                                        }}
                                        // onClick={() =>
                                        //     dispatch(
                                        //         updateRecipe(post._id, history)
                                        //     )
                                        // }
                                    >
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path
                                            fill-rule="evenodd"
                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                        />
                                    </svg>
                                    {/* </button> */}
                                </Link>
                            ) : null}

                            {token ? (
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="40"
                                        height="40"
                                        fill="currentColor"
                                        class="bi bi-trash"
                                        viewBox="0 0 16 16"
                                        onClick={() =>
                                            dispatch(
                                                deleteRecipe(post._id, history)
                                            )
                                        }
                                        style={{
                                            marginTop: "-62px",
                                            marginLeft: "220px",
                                            color: "#FF7F50",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                        <path
                                            fill-rule="evenodd"
                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                        />
                                    </svg>
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div
                        style={{
                            marginLeft: "50px",
                            textAlign: "justify",
                            textJustify: "inter-word",
                        }}
                    >
                        <h3 style={{ marginTop: "40px", fontFamily: "serif" }}>
                            Ingredients:
                        </h3>
                        <p
                            style={{
                                fontSize: "20px",
                                fontFamily: "cursive",
                                marginTop: "20px",
                            }}
                        >
                            {post.ingredients}
                        </p>
                    </div>
                </div>

                <h3 style={{ marginTop: "25px", fontFamily: "serif" }}>
                    {" "}
                    Recipe Steps:{" "}
                </h3>
                <p
                    style={{
                        fontSize: "25px",
                        fontFamily: "cursive",
                        width: "1200px",
                        textAlign: "justify",
                        textJustify: "inter-word",
                    }}
                >
                    {post.desc}
                </p>
                <AddComment />
                <CommentsList />
            </div>
        </section>
    );
}

export default Details;
