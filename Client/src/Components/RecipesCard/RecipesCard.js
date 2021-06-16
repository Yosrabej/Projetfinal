import React, { useState } from "react";
import StarsRating from "stars-rating";
import { Card, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipe } from "../../Redux/actions/posts";
import { addToFavorites } from "../../Redux/actions/user";
// import Rating from "../Rating/Rating";
export default function RecipesCard({ post }) {
    const [rate, setRating] = useState(0);
    const ratingChanged = (newRating) => {
        setRating(newRating);
        console.log(newRating);
    };
    // const favorites = {
    //     id: post._id,
    //     desc: post.desc,
    //     img: post.img,
    //     title: post.title,
    // };
    const user = useSelector((state) => state.userReducer.user);

    let history = useHistory();
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getRecipe(post._id, history));
    };
    const handleFavorite = (e) => {
        e.preventDefault();
        dispatch(addToFavorites(user._id, { post: post }));
    };
    return (
        <div>
            <Card className="recipeCard" style={{ width: "18rem" }}>
                <div className="svgC" style={{ display: "flex" }}>
                    <StarsRating
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        color2={"#ffd700"}
                        value={rate}
                    />
                    {/* <Rating rating={post.rating} numReviews={post.numReviews} /> */}

                    <div>
                        <Link to={`/favorites`}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="currentColor"
                                class="bi bi-suit-heart-fill"
                                viewBox="0 0 16 16"
                                style={{
                                    marginLeft: "150px",

                                    cursor: "pointer",
                                }}
                                onClick={(e) => {
                                    handleFavorite(e);
                                    history.push("/favorites");
                                }}
                            >
                                <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                            </svg>
                        </Link>
                    </div>
                </div>
                <Card.Img
                    variant="top"
                    src={post.img}
                    style={{ width: "286px", height: "281px" }}
                />

                <Card.Body
                    style={{ textAlign: "center", backgroundColor: "#ffebeb" }}
                >
                    <Card.Title style={{ height: "30px" }}>
                        <h1>{post.title}</h1>
                    </Card.Title>
                </Card.Body>
                <Card.Footer
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        backgroundColor: "#ffebeb",
                    }}
                >
                    <Button
                        variant="primary"
                        style={{
                            backgroundColor: "	#FF7F50	",
                            border: "none",
                        }}
                        onClick={handleSubmit}
                    >
                        View recipe
                    </Button>
                    {/* <Button
                        variant="primary"
                        style={{
                            backgroundColor: "#FF7F50	",
                            border: "none",
                            color: "white",
                        }}
                    > */}
                    <h6 style={{ color: "black", fontFamily: "cursive" }}>
                        created by <br />
                        {post.name}
                    </h6>
                    {/* </Button> */}
                </Card.Footer>
            </Card>
        </div>
    );
}
