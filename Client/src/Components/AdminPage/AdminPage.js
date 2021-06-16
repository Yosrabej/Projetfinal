import React from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers } from "../../Redux/actions/user";

const AdminPage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer.user);

    return (
        <div>
            <Card style={{ width: "18rem" }}>
                <Card.Body>
                    <Card.Title>Users</Card.Title>
                    <Link to="/users">
                        <Button
                            variant="primary"
                            onClick={() => {
                                dispatch(getUsers());
                            }}
                        >
                            {" "}
                            See all users
                        </Button>
                    </Link>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AdminPage;
