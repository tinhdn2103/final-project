import React, { useState } from "react";
import "./navbar.scss";
import { BsSearch } from "react-icons/bs";
import { MdNotifications, MdOutlineArrowDropDown } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/reducers/authSlice";

const Navbar = ({ setGenre, search }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEnter = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false && e.target.value) {
      e.preventDefault();
      navigate("/search", { state: { search: e.target.value } });
    }
  };

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/movie-web-fadf1.appspot.com/o/logo_nobg.png?alt=media&token=1de4bd0b-097f-4aac-ad2d-b15e4f8d3608"
            alt=""
          />
          <Link to="/" className="link" onClick={() => setGenre(null)}>
            <span>Trang chủ</span>
          </Link>
          <Link to="/series" className="link">
            <span className="navbarmainLinks">Phim truyền hình</span>
          </Link>
          <Link to="/movies" className="link">
            <span className="navbarmainLinks">Phim</span>
          </Link>
          <span>Mới thêm</span>
          <Link to="/myList" className="link">
            <span>Danh sách của tôi</span>
          </Link>
        </div>
        <div className="right">
          {(showInput || search) && (
            <input
              type="text"
              defaultValue={search}
              className="search"
              placeholder="Tìm kiếm"
              autoFocus
              onBlur={(e) => !e.target.value && setShowInput(false)}
              onKeyDown={handleEnter}
            />
          )}
          {!showInput && !search && (
            <BsSearch
              className="icon"
              size={20}
              id="btnSearch"
              onClick={() => setShowInput(true)}
            />
          )}
          <span>Trẻ em</span>
          <MdNotifications className="icon" size={20} />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/movie-web-fadf1.appspot.com/o/avatar_default.jpg?alt=media&token=58615de8-5e1d-4bc1-bf89-0ce4fdf004f3"
            alt=""
          />

          <div className="profile">
            <MdOutlineArrowDropDown className="icon" size={20} />
            <div className="options">
              <span>Cài đặt</span>
              <span onClick={() => dispatch(logout())}>Đăng xuất</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
