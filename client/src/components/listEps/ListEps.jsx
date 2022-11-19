import React, { useRef, useState } from "react";
import "./listEps.scss";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import EpItem from "../epItem/EpItem";
import { useSelector } from "react-redux";
import { movieSelector } from "../../store/reducers/movieSlice";

const ListEps = () => {
  const [isMoved, setIsMoved] = useState(false);

  const [slideNumber, setSlideNumber] = useState(0);

  const [clickLimit, setClickLimit] = useState(window.innerWidth / 210);

  const { listEps } = useSelector(movieSelector);

  const listRef = useRef();

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${210 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 10 - clickLimit) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-210 + distance}px)`;
    }
  };
  return (
    <div className="list">
      <span className="listTitle">
        Danh sách tập<span className="eps">{listEps.length} tập</span>
      </span>

      <div className="wrapper">
        <MdArrowBackIosNew
          className="sliderArrow left"
          onClick={() => handleClick("left")}
          style={{ display: !isMoved && "none" }}
        />
        <div className="container" ref={listRef}>
          {listEps.map((item, index) => (
            <EpItem key={index} item={item} index={index} />
          ))}
        </div>
        <MdArrowForwardIos
          className="sliderArrow right"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};

export default ListEps;
