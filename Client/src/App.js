import React, { useState } from "react";
import NavBar from "./Components/NavBar/NavBar";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import Errors from "./Pages/Errors/Errors";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./router/PrivateRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { current } from "./Redux/actions/user";
import SearchBar from "./Components/SearchBar/SearchBar";
import Details from "./Components/Details/Details";
import RecipesList from "./Components/RecipesList/RecipesList";
import AddPage from "./Components/AddPage/AddPage";
import Edit from "./Components/Edit/Edit";
import { getRecipe } from "./Redux/actions/posts";
import EditRecipe from "./Components/Edit/EditRecipe";
import FavoritePage from "./Components/FavoritePage/FavoritePage";
import AdminPage from "./Components/AdminPage/AdminPage";
import UsersList from "./Components/AdminPage/UsersList";

function App() {
    const post = useSelector((state) => state.postReducer.post);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(current());
    });

    const [search, setSearch] = useState("");
    const getSearch = (x) => {
        setSearch(x);
    };

    useEffect(() => {
        dispatch(getRecipe(post));
    }, [dispatch]);

    return (
        <div>
            <NavBar />
            <Switch>
                {/* <Route path="/test">
                    {" "}
                    <Test />{" "}
                </Route> */}
                <Route path="/favorites" component={FavoritePage} />
                <Route exact path="/">
                    <SearchBar getSearch={getSearch} search={search} />

                    <RecipesList search={search} />
                </Route>
                <PrivateRoute path="/add">
                    <AddPage />
                </PrivateRoute>
                <Route path="/details/:id" component={Details} />

                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <PrivateRoute path="/profile" component={Profile} />
                <Route path="/edit">
                    <Edit />
                </Route>
                <Route path="/editrecipe">
                    <EditRecipe />
                </Route>
                <Route path="/admin" component={AdminPage} />
                <Route path="/users" component={UsersList} />
                <Route path="/*" component={Errors} />
            </Switch>
        </div>
    );
}

export default App;
