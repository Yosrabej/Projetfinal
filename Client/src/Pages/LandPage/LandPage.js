import React from "react";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Redux/actions/user";

// todo: /form appears twice/I want different background for each route//
const LandPage = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.userReducer.isAuth);
    return (
        <div className="Landpage">
            <header>
                <h2>
                    <Link to="/">RecipesApp</Link>
                </h2>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>

                        {isAuth ? (
                            <ul>
                                <Link to="/">
                                    <li onClick={() => dispatch(logout())}>
                                        Logout
                                    </li>
                                </Link>
                            </ul>
                        ) : (
                            <ul>
                                <Link to="/register">
                                    <li>Register</li>
                                </Link>
                                <Link to="/login">
                                    <li>LogIn</li>
                                </Link>
                            </ul>
                        )}
                    </ul>
                </nav>
            </header>
            {/* appears twice */}
            {/* <div className="cover">
                <h1>What are you cooking today?</h1>
                <form className="flex-form">
                    <input type="search" placeholder="What are cooking today" />
                    <input type="submit" value="Search" />
                </form>
            </div> */}
        </div>
    );
};
export default LandPage;
