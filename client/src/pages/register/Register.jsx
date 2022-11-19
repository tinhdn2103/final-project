import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const emailRef = useRef();

  const navigate = useNavigate();
  const handleStart = () => {
    setEmail(emailRef.current.value);
  };

  const handleFinish = async (e) => {
    e.preventDefault();

    try {
      await axios.post("auth/register", { username, email, password });
      navigate("/login");
    } catch (error) {}
  };

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://firebasestorage.googleapis.com/v0/b/movie-web-fadf1.appspot.com/o/logo_nobg.png?alt=media&token=1de4bd0b-097f-4aac-ad2d-b15e4f8d3608"
            alt=""
          />
          <Link to="/login">
            <button className="loginButton">Đăng nhập</button>
          </Link>
        </div>
      </div>
      <div className="container">
        <h1>Chương trình truyền hình, </h1>
        <h1>phim không giới hạn và nhiều nội dung khác.</h1>
        <h2>Xem ở mọi nơi. Hủy bất kỳ lúc nào.</h2>
        <p>
          Bạn đã sẵn sàng xem chưa? Nhập email để tạo hoặc kích hoạt lại tư cách
          thành viên của bạn.
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="Địa chỉ email" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Bắt đầu
            </button>
          </div>
        ) : (
          <form className="input">
            <input
              type="username"
              placeholder="Tên người dùng"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="registerButton" onClick={handleFinish}>
              Bắt đầu
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
