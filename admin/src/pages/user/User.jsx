import React, { useEffect, useRef, useState } from "react";
import "./user.css";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import { addNoti } from "../../store/reducers/notiSlice";
import { updateUser } from "../../store/reducers/userSlice";
import storage from "../../firebase";

const User = () => {
  const location = useLocation();
  const { user } = location.state;
  const newUser = useRef(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [submit, setSubmit] = useState(false);
  const [img, setImg] = useState(
    user.profilePic ||
      "https://firebasestorage.googleapis.com/v0/b/movie-web-fadf1.appspot.com/o/avatar_default.jpg?alt=media&token=58615de8-5e1d-4bc1-bf89-0ce4fdf004f3"
  );
  const [selectedFile, setSelectedFile] = useState();
  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setImg(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);

  const handleChange = (e) => {
    const value = e.target.value;
    newUser.current = { ...newUser.current, [e.target.name]: value };
  };

  const handleUpload = () => {
    const fileName = new Date().getTime() + selectedFile.name;
    const uploadTask = storage.ref(`/profilePic/${fileName}`).put(selectedFile);
    uploadTask.on(
      "state_change",
      (snapshot) => {
        const prg = (
          (snapshot.bytesTransferred / snapshot.totalBytes) *
          100
        ).toFixed(0);
        console.log("Upload is " + prg + "% done");
        setProgress(prg);
      },
      (error) => {
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          newUser.current = { ...newUser.current, profilePic: url };
          dispatch(updateUser(newUser.current));
          navigate("/users");
        });
      }
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newUser.current.username || !newUser.current.email) {
      dispatch(
        addNoti({
          id: v4(),
          type: "ERROR",
          message: "Vui lòng điền đầy đủ thông tin",
          title: "Error Request",
        })
      );
    } else {
      setSubmit(true);
      if (selectedFile) {
        handleUpload();
      } else {
        dispatch(updateUser(newUser.current));
        navigate("/users");
      }
    }
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Chỉnh sửa người dùng</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={
                user.profilePic ||
                "https://firebasestorage.googleapis.com/v0/b/movie-web-fadf1.appspot.com/o/avatar_default.jpg?alt=media&token=58615de8-5e1d-4bc1-bf89-0ce4fdf004f3"
              }
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Chi tiết tài khoản</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Chỉnh sửa</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Tên người dùng</label>
                <input
                  name="username"
                  type="text"
                  defaultValue={user.username}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>

              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  name="email"
                  type="text"
                  defaultValue={user.email}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              {submit ? (
                <div className="loader"></div>
              ) : (
                <button className="userUpdateButton" onClick={handleSubmit}>
                  Cập nhật
                </button>
              )}
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img className="userUpdateImg" src={img} alt="" />
                <input
                  type="file"
                  id="img"
                  name="img"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default User;
