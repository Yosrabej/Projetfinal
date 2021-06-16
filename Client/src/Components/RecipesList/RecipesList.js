import React, { useEffect } from "react";
import RecipesCard from "../RecipesCard/RecipesCard";
import "./RecipesList.css";
import { useSelector, useDispatch } from "react-redux";
import { getRecipes } from "../../Redux/actions/posts";

export default function RecipesList({ search }) {
    const posts = useSelector((state) => state.postReducer.posts);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch]);
    return (
        <div className="recipeList">
            {posts
                .filter((el) =>
                    el.title.toLowerCase().includes(search.toLowerCase())
                )
                .map((post, i) => (
                    <RecipesCard key={post._id} post={post} />
                ))}
        </div>
    );
}
