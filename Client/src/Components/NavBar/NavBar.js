import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Redux/actions/user";
import AddRecipe from "../AddRecipe/AddRecipe";
function NavBar() {
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.userReducer.isAuth);
    const user = useSelector((state) => state.userReducer.user);
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Link to="/">
                    <Navbar.Brand href="#home">RecipesApp</Navbar.Brand>
                </Link>
                <Nav className="mr-auto" style={{ alignItems: "center" }}>
                    <Link to="/">
                        <Nav.Link href="#home">Home</Nav.Link>
                    </Link>

                    {isAuth ? (
                        <ul style={{ paddingTop: "17px", display: "flex" }}>
                            <Link to="/">
                                <Nav.Link
                                    href="#Logout"
                                    onClick={() => dispatch(logout())}
                                >
                                    Logout
                                </Nav.Link>
                            </Link>

                            <Link to="/profile">
                                <Nav.Link href="#profile">My Profile</Nav.Link>
                            </Link>
                            {user && user.isAdmin ? (
                                <Link to="/admin">
                                    <Nav.Link href="#admin">Admin</Nav.Link>
                                </Link>
                            ) : null}
                        </ul>
                    ) : (
                        <ul style={{ display: "flex", paddingTop: "17px" }}>
                            <Link to="/register">
                                <Nav.Link href="#features">Register</Nav.Link>
                            </Link>
                            <Link to="/login">
                                <Nav.Link href="#pricing">LogIn</Nav.Link>
                            </Link>
                        </ul>
                    )}
                </Nav>

                <div style={{ paddingRight: "20px" }}>
                    <AddRecipe />
                </div>
            </Navbar>
        </div>
    );
}
export default NavBar;
