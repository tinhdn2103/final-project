import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/reducers/authSlice";
import "./login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://firebasestorage.googleapis.com/v0/b/movie-web-fadf1.appspot.com/o/logo_nobg.png?alt=media&token=1de4bd0b-097f-4aac-ad2d-b15e4f8d3608"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Đăng nhập</h1>
          <input
            type="email"
            placeholder="Email hoặc số điện thoại"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginButton" onClick={handleLogin}>
            Đăng nhập
          </button>
          <span>
            Bạn mới tham gia Netflix? <b> Đăng ký ngay.</b>
          </span>
          <small>
            Trang này được Google reCAPTCHA bảo vệ để đảm bảo bạn không phải là
            robot. <b>Tìm hiểu thêm.</b>
          </small>
        </form>
      </div>
    </div>
  );
};

export default Login;
