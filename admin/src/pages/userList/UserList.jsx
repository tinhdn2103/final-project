import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import {
  deleteUser,
  getUsers,
  userSelector,
} from "../../store/reducers/userSlice";
import { useEffect } from "react";
const UserList = () => {
  const users = useSelector(userSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };
  const columns = [
    // { field: "_id", headerName: "ID", width: 250 },
    {
      field: "user",
      headerName: "Người dùng",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={
                params.row.profilePic ||
                "https://firebasestorage.googleapis.com/v0/b/movie-web-fadf1.appspot.com/o/avatar_default.jpg?alt=media&token=58615de8-5e1d-4bc1-bf89-0ce4fdf004f3"
              }
              alt=""
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 300 },

    {
      field: "action",
      headerName: "Action",
      width: 90,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id} state={{ user: params.row }}>
              <button className="userListEdit">Edit</button>
            </Link>
            {/* <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            /> */}
          </>
        );
      },
    },
  ];

  return (
    <div className="userListWrapper">
      <div className="userListContainer">
        <h1 className="userListTitle">Danh sách người dùng</h1>
        <Link to="/newUser">
          <button className="userAddButton">Tạo mới</button>
        </Link>
      </div>

      {users && (
        <div className="userList">
          <DataGrid
            rows={users}
            disableSelectionOnClick
            columns={columns}
            pageSize={10}
            getRowId={(r) => r._id}
          />
        </div>
      )}
    </div>
  );
};

export default UserList;
