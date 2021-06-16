import React from "react";
import { Table, Button } from "react-bootstrap";
import { deleteUser } from "../../Redux/actions/user";
import { useDispatch } from "react-redux";

function UserCard({ user }) {
    const dispatch = useDispatch();

    return (
        <div>
            <Table striped bordered style={{ width: "300px" }}>
                <div>
                    <Button
                        style={{ marginTop: "15px", marginBottom: "15px" }}
                        onClick={() => {
                            dispatch(deleteUser(user._id));
                        }}
                    >
                        Delete
                    </Button>
                </div>
                <div>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{user && user.name}</td>
                            <td>{user && user.email}</td>
                        </tr>
                    </tbody>
                </div>
            </Table>
        </div>
    );
}

export default UserCard;
