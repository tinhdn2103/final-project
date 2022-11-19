import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "../../apiClient";
import "./payment.scss";
import { useDispatch } from "react-redux";
import { checkActive } from "../../store/reducers/authSlice";

const Success = () => {
  const [session, setSession] = useState();
  const location = useLocation();
  const queryLocation = location.search;
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get("payment/success" + queryLocation);
        setSession(res.data);
        dispatch(checkActive());
      } catch (error) {
        console.log(error);
      }
    };
    fetchSession();
  }, [queryLocation]);
  return (
    <div className="payment">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://firebasestorage.googleapis.com/v0/b/movie-web-fadf1.appspot.com/o/logo_nobg.png?alt=media&token=1de4bd0b-097f-4aac-ad2d-b15e4f8d3608"
            alt=""
          />
          <Link to="/login">
            <button className="logoutButton">Đăng xuất</button>
          </Link>
        </div>
      </div>
      {session && (
        <>
          {session.status === "success" ? (
            <div className="container">
              <h1>Đăng ký thành công</h1>
              <Link to="/">
                <button className="startButton">Bắt đầu</button>
              </Link>
            </div>
          ) : (
            <div className="container">
              <h1>Đăng ký không thành công</h1>
              <button className="backButton">Quay lại</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Success;
