import React, { useEffect, useState } from "react";
import "./listItem.scss";
import { BsFillPlayFill } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { BiLike, BiDislike } from "react-icons/bi";
import axios from "../../apiClient";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMovie } from "../../store/reducers/movieSlice";
import { addNoti } from "../../store/reducers/notiSlice";
import { v4 } from "uuid";

const ListItem = ({ index, item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movieItem, setMovieItem] = useState({});
  const dispatch = useDispatch();

  const handleAdd = () => {
    const addToMyList = async () => {
      try {
        await axios.post("/myList", {
          movie: item,
        });
        dispatch(
          addNoti({
            id: v4(),
            type: "SUCCESS",
            message: "Đã thêm vào danh sách của tôi",
            title: "Successful Request",
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    addToMyList();
  };

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/find/" + item);
        setMovieItem(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMovie();
  }, [item]);
  return (
    <div
      className="listItem"
      style={{ left: isHovered && index * 205 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={movieItem.img} alt="" />
      {isHovered && (
        <>
          <Link to={"/watch"} onClick={() => dispatch(setMovie(movieItem))}>
            <video src={movieItem.trailer} autoPlay={true} loop />
          </Link>
          <div className="itemInfo">
            <div className="icons">
              <BsFillPlayFill className="icon" size={20} />
              <IoMdAdd className="icon" size={20} onClick={handleAdd} />
              <BiLike className="icon" size={20} />
              <BiDislike className="icon" size={20} />
            </div>
            <div className="itemInfoTop">
              <span>{movieItem.duration}</span>
              <span className="limit">{movieItem.limit}</span>
              <span>{movieItem.year}</span>
            </div>
            <div className="desc">{movieItem.desc}</div>
            <div className="genre">{movieItem.genre}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default ListItem;
