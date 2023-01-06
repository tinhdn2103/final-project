import React, { useEffect, useRef, useState } from "react";
import "./newUser.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNoti } from "../../store/reducers/notiSlice";
import { v4 } from "uuid";
import { createUser } from "../../store/reducers/userSlice";

const NewUser = () => {
  const user = useRef(null);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const value = e.target.value;
    user.current = { ...user.current, [e.target.name]: value };
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.current || !user.current.username || !user.current.password) {
      dispatch(
        addNoti({
          id: v4(),
          type: "ERROR",
          message: "Vui lòng điền đầy đủ thông tin",
          title: "Error Request",
        })
      );
    } else {
      dispatch(createUser(user.current));
      navigate("/users");
    }
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">Người dùng mới</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Tên người dùng</label>
          <input
            name="username"
            type="text"
            placeholder="tinhdn"
            onChange={handleChange}
          />
        </div>

        <div className="newUserItem">
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="tinhdn@gmail.com"
            onChange={handleChange}
          />
        </div>

        <div className="newUserItem">
          <label>Mật khẩu</label>
          <input
            name="password"
            type="password"
            placeholder="Mật khẩu"
            onChange={handleChange}
          />
        </div>

        <div className="newUserItem">
          <label>isAdmin?</label>
          <select name="isAdmin" onChange={handleChange}>
            <option value="">isAdmin?</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button className="newUserButton" onClick={handleSubmit}>
          Tạo
        </button>
      </form>
    </div>
  );
};

export default NewUser;
