import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "../../apiClient";

const Cancel = () => {
  const [session, setSession] = useState({});
  const location = useLocation();
  const queryLocation = location.search;
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get("payment/cancel" + queryLocation);
        setSession(res.data);
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
          {session.status === "fail" ? (
            <div className="container">
              <h1>Đăng ký bị hủy</h1>
              <Link to="/">
                <button className="backButton">Quay lại</button>
              </Link>
            </div>
          ) : (
            <div className="container">
              <Link to="/">
                <button className="backButton">Quay lại</button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cancel;
