import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { current } from "../../Redux/actions/user";
import RecipesCard from "../RecipesCard/RecipesCard";
import "./FavoritePage.css";
function FavoritePage() {
    const user = useSelector((state) => state.userReducer.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(current());
    }, [dispatch]);
    return (
        <div className="favoriteList">
            <h1>Favorite recipes</h1>
            {user &&
                user.favorites.map((favorite, i) => (
                    <RecipesCard key={favorite._id} post={favorite} />
                ))}
        </div>
    );
}

export default FavoritePage;
