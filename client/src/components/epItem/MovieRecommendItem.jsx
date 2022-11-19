import React, { useEffect, useState } from "react";
import "./epItem.scss";
import { BsFillPlayFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "../../apiClient";
import { setMovie } from "../../store/reducers/movieSlice";

const MovieRecommendItem = ({ index, item }) => {
  const dispatch = useDispatch();
  const [movieItem, setMovieItem] = useState({});
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
    <Link
      className="link"
      to={"/watch"}
      onClick={() => dispatch(setMovie(movieItem))}
    >
      <div className="epItem">
        <img src={movieItem.img} alt="" />
        <div className="play" style={{ left: index * 205 + 80 + index * 2.5 }}>
          <BsFillPlayFill />
        </div>
        <div className="epInfo">
          <div className="epInfoTop">
            <span>{movieItem.title}</span>
          </div>
          <div>{movieItem.duration}ph</div>
          <div>{movieItem.desc}</div>
        </div>
      </div>
    </Link>
  );
};

export default MovieRecommendItem;
