import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login, videErrors } from "../../Redux/actions/user";
import Error from "../Errors/Errors";
import "./Login.css";

const Login = ({ history }) => {
    const [user, setUser] = useState({});
    const errors = useSelector((state) => state.userReducer.errors);
    const dispatch = useDispatch();
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login(user, history));
    };

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    useEffect(() => {
        return () => {
            dispatch(videErrors());
        };
    }, [dispatch]);
    return (
        <div className="container-fluid">
            <div className="row no-gutter">
                <div className="d-none d-md-flex col-md-3 " />
                <div className="col-md-8 col-lg-6">
                    <div className="login d-flex align-items-center py-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-9 col-lg-8 mx-auto">
                                    {/* {errors.length > 0
                                        ? errors.map((el) => (
                                              <Error error={el} />
                                          ))
                                        : null} */}
                                    <h3 className="login-heading mb-4">
                                        Welcome back!
                                    </h3>
                                    <form onSubmit={handleLogin}>
                                        <div className="form-label-group">
                                            <input
                                                type="email"
                                                id="inputEmail"
                                                name="email"
                                                className="form-control"
                                                placeholder="Email address"
                                                required
                                                autofocus
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="inputEmail">
                                                Email address
                                            </label>
                                        </div>
                                        <div className="form-label-group">
                                            <input
                                                type="password"
                                                name="password"
                                                id="inputPassword"
                                                className="form-control"
                                                placeholder="Password"
                                                required
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="inputPassword">
                                                Password
                                            </label>
                                        </div>
                                        <div className="custom-control custom-checkbox mb-3">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                id="customCheck1"
                                            />
                                            <label
                                                className="custom-control-label"
                                                htmlFor="customCheck1"
                                            >
                                                Remember password
                                            </label>
                                        </div>
                                        <button
                                            className="btn btn-lg  btn-block btn-login text-uppercase font-weight-bold mb-2"
                                            type="submit"
                                            style={{
                                                backgroundColor: "#FF7F50	",
                                            }}
                                        >
                                            Sign in
                                        </button>
                                        <div className="text-center">
                                            <Link to="/register">Register</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
