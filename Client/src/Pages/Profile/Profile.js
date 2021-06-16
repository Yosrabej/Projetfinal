import React from "react";

// import "./Profile.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Profile() {
    const user = useSelector((state) => state.userReducer.user);

    return (
        <div>
            <div className="row py-5 px-4">
                <div className="col-md-5 mx-auto">
                    <div className="bg-white shadow rounded overflow-hidden">
                        <div className="px-4 pt-0 pb-4 cover">
                            <div className="media align-items-end profile-head">
                                <div className="profile mr-3">
                                    <img
                                        src={user.profilePic} //todo: upload profile pic
                                        alt="profilepic"
                                        width="130"
                                        className="rounded mb-2 img-thumbnail"
                                    />
                                    <Link to="/edit">
                                        <a
                                            href="#edit"
                                            className="btn btn-outline-dark btn-sm btn-block"
                                        >
                                            Edit profile
                                        </a>
                                    </Link>
                                </div>
                                <div className="media-body mb-5 text-black">
                                    <h4 className="mt-0 mb-0">{user.name}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="bg-light p-4 d-flex justify-content-end text-center">
                            <ul className="list-inline mb-0">
                                <li className="list-inline-item">
                                    <Link to="/favorites">
                                        <h5 className="font-weight-bold mb-0 d-block">
                                            favorite Recipes
                                        </h5>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* <div className="py-4 px-4">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <h5 className="mb-0">Recent recipes</h5>
                                <a
                                    href="#showall"
                                    className="btn btn-link text-muted"
                                >
                                    Show all
                                </a>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
