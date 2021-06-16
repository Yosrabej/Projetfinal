import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../Redux/actions/user";
import UserCard from "./UserCard";
function UsersList() {
    const users = useSelector((state) => state.userReducer.users);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsers());
    }, []);
    return (
        <div>
            {users &&
                users.map((user, index) => (
                    <UserCard user={user} key={user._id} />
                ))}
        </div>
    );
}

export default UsersList;
