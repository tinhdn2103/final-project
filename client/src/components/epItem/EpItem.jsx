import React from "react";
import "./epItem.scss";
import { BsFillPlayFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import {
  movieSelector,
  setCurrentEp,
  setCurrentTime,
} from "../../store/reducers/movieSlice";
const EpItem = ({ index, item }) => {
  const { movie, currentEp } = useSelector(movieSelector);
  const dispatch = useDispatch();
  return (
    <div
      className="epItem"
      onClick={() => {
        dispatch(setCurrentEp(item.ep));
        dispatch(setCurrentTime(0));
      }}
    >
      <img src={movie.img} alt="" />
      {currentEp == item.ep ? (
        <div className="watching">Đang phát</div>
      ) : (
        <div className="play" style={{ left: index * 205 + 80 + index * 2.5 }}>
          <BsFillPlayFill />
        </div>
      )}

      <div className="epInfo">
        <div className="epInfoTop">
          <span>Tập {item.ep}.</span>
          <span>{item.title}</span>
        </div>
        <div>{item.duration}</div>
        <div>{item.desc}</div>
      </div>
    </div>
  );
};

export default EpItem;
