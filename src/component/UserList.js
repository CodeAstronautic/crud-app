import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../redux/userSlice";
import UserForm from "./UserForm";

const UserList = () => {
    const dispatch = useDispatch();
    const [editModal, setEditModal] = useState(false);
    const [userdata, setIUserData] = useState(null);
    const users = useSelector((state) => state.users);

    const handleEdit = (user) => {
        setIUserData(user);
        setEditModal(true);
    };

    return (
        <div>
            <h2>User Lists</h2>
            <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>DOB</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.userList?.length > 0 ? (
                        users.userList.map((user, index) => (
                            <tr key={index}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.dob}</td>
                                <td>
                                    <button onClick={() => handleEdit(user)} className="edit-btn">Edit</button>
                                </td>
                                <td>
                                    <button onClick={() => dispatch(deleteUser(user.id))} className="delete-btn">Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="7" style={{ textAlign: "center" }}>No Users Found</td></tr>
                    )}
                </tbody>
            </table>

            {editModal && (
                <div style={{
                    position: "fixed",
                    top: 0, left: 0, width: "100%", height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex", justifyContent: "center", alignItems: "center"
                }}>
                    <div style={{
                        backgroundColor: "white", padding: 20,
                        width: "60%", borderRadius: "10px", position: "relative"
                    }}>
                        <UserForm
                            userdata={userdata}
                            handleClose={() => {
                                setEditModal(false);
                                setIUserData(null);
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserList;
