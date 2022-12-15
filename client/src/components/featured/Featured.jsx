import React, { useEffect, useState } from "react";
import "./featured.scss";
import { FaPlay } from "react-icons/fa";
import { HiOutlineInformationCircle } from "react-icons/hi";
import axios from "../../apiClient";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMovie } from "../../store/reducers/movieSlice";

const Featured = ({ type, setGenre }) => {
  const [content, setContent] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`/movies/random?type=${type}`);
        setContent(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getRandomContent();
  }, [type]);

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Phim" : "Phim truyền hình"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>Thể loại</option>
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
      )}
      <img src={content.img} alt="" className="img" />

      <div className="info">
        <img src={content.imgTitle} alt="" />

        <span className="desc">{content.desc}</span>

        <div className="buttons">
          <Link
            to={"/watch"}
            className="link"
            onClick={() => dispatch(setMovie(content))}
          >
            <button className="play">
              <FaPlay />
              <span>Phát</span>
            </button>
          </Link>
          <button className="more">
            <HiOutlineInformationCircle />
            <span>Thông tin khác</span>
          </button>
        </div>
      </div>

      <div className="control"></div>
    </div>
  );
};

export default Featured;
