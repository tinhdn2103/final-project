import React, { useRef, useState } from "react";
import "./list.scss";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import ListItem from "../listItem/ListItem";

const ListSpecial = ({ list, title }) => {
  const [isMoved, setIsMoved] = useState(false);

  const [slideNumber, setSlideNumber] = useState(0);

  const [clickLimit, setClickLimit] = useState(window.innerWidth / 210);

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
      <span className="listTitle">{title}</span>
      <div className="wrapper">
        <MdArrowBackIosNew
          className="sliderArrow left"
          onClick={() => handleClick("left")}
          style={{ display: !isMoved && "none" }}
        />
        <div className="container" ref={listRef}>
          {list.map((item, index) => (
            <ListItem key={index} index={index} item={item} />
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

export default ListSpecial;
