import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./list.css";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import { addNoti } from "../../store/reducers/notiSlice";
import { useRef } from "react";
import { updateList } from "../../store/reducers/listSlice";

const List = () => {
  const location = useLocation();
  const { list } = location.state;
  const newList = useRef(list);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    newList.current = { ...newList.current, [e.target.name]: value };
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (
      !newList.current.title ||
      !newList.current.genre ||
      !newList.current.type
    ) {
      dispatch(
        addNoti({
          id: v4(),
          type: "ERROR",
          message: "Vui lòng điền đầy đủ thông tin",
          title: "Error Request",
        })
      );
    } else {
      dispatch(updateList(newList.current));
      navigate("/lists");
    }
  };
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Danh sách</h1>
        <Link to="/newList">
          <button className="productAddButton">Tạo mới</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{list.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">ID:</span>
              <span className="productInfoValue">{list._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Thể loại:</span>
              <span className="productInfoValue">{list.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Movie hay Series:</span>
              <span className="productInfoValue">{list.type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Tên danh sách</label>
            <input
              name="title"
              type="text"
              defaultValue={list.title}
              onChange={handleChange}
            />
            <label>Thể loại</label>
            <select
              name="genre"
              id="genre"
              onChange={handleChange}
              defaultValue={list.genre}
            >
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
            <label>Movie hay Series</label>
            <select
              name="type"
              onChange={handleChange}
              defaultValue={list.type}
            >
              <option value="">Phim hay Series?</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
          <div className="productFormRight">
            <button className="productButton" onClick={handleUpdate}>
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default List;
