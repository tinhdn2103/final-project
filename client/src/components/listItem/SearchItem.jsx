import React, { useEffect, useState } from "react";
import "./listItem.scss";
import { BsFillPlayFill } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { BiLike, BiDislike } from "react-icons/bi";
import axios from "../../apiClient";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMovie } from "../../store/reducers/movieSlice";

const SearchItem = ({ index, item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movieItem, setMovieItem] = useState({});
  const dispatch = useDispatch();

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
      style={{
        left: isHovered && (index % 6) * 205 - 50 + (index % 6) * 2.5,
        top:
          isHovered &&
          Math.floor(index / 6) * 115 - 100 + Math.floor(index / 6) * 50,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={movieItem.img} alt="" />
      {isHovered && (
        <>
          <Link to={"/watch"} onClick={() => dispatch(setMovie(movieItem))}>
            <video src={movieItem.trailer} autoPlay={true} loop />{" "}
          </Link>

          <div className="itemInfo">
            <div className="icons">
              <BsFillPlayFill className="icon" size={20} />
              <IoMdAdd className="icon" size={20} />
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

export default SearchItem;
