import React, { useEffect, useState } from "react";
import "./newList.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewList = () => {
  const [list, setList] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const createList = async () => {
      try {
        const res = await axios.post("/lists", list, {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        navigate("/addListMovie/" + res.data._id, {
          state: { list: res.data },
        });
      } catch (error) {
        console.log(error);
      }
    };
    createList();
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Danh sách mới</h1>
      <form className="addProductForm">
        <div className="formLeft">
          <div className="addProductItem">
            <label>Tiêu đề</label>
            <input
              type="text"
              placeholder="Phim trinh thám hay nhất"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Thể loại</label>
            {/* <input
              type="text"
              placeholder="Thể loại"
              name="genre"
              onChange={handleChange}
            /> */}
            <select name="genre" id="genre" onChange={handleChange}>
              <option value="">Thể loại</option>
              <option value="adventure">Phiêu lưu</option>
              <option value="comedy">Hài kịch</option>
              <option value="crime">Tội phạm</option>
              <option value="fantasy">Kỳ ảo</option>
              <option value="historical">Lịch sử</option>
              <option value="horror">Kinh dị</option>
              <option value="romance">Lãng mạn</option>
              <option value="sci-fi">Khoa học viễn tưởng</option>
              <option value="thriller">Giật gân</option>
              <option value="western">Viễn tây</option>
              <option value="animation">Hoạt hình</option>
              <option value="drama">Drama</option>
              <option value="documentary">Tài liệu</option>
            </select>
          </div>

          <div className="addProductItem">
            <label>Series?</label>
            <select name="type" onChange={handleChange}>
              <option value="">Phim hay Series?</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
        </div>

        <button className="addListButton" onClick={handleSubmit}>
          Tạo
        </button>
      </form>
    </div>
  );
};

export default NewList;
