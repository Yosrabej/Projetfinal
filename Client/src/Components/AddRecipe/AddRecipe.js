import React from "react";
import { Link } from "react-router-dom";
import "./AddRecipe.css";

function AddRecipe() {
    // const isAuth = useSelector((state) => state.userReducer.isAuth);
    // const handleAlert = (e) => {
    //     e.preventDefault();
    //     if (!isAuth) {
    //         return alert(
    //             "To be able to add a recipe, please Login or register "
    //         );
    //     }
    // };
    return (
        <div>
            <Link to="/add">
                <button
                    variant="primary"
                    style={{
                        backgroundColor: "#FF7F50	",
                        border: "none",
                        borderRadius: "10px",
                        height: "38px",
                    }}
                    // onClick={handleAlert}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="20"
                        fill="currentColor"
                        class="bi bi-plus-circle-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                    </svg>
                    Add new Recipe
                </button>
            </Link>
        </div>
    );
}
export default AddRecipe;
