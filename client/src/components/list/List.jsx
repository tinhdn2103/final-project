import React, { useRef, useState } from "react";
import "./list.scss";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import ListItem from "../listItem/ListItem";

const List = ({ list }) => {
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
    if (
      direction === "right" &&
      slideNumber < list.content.length - clickLimit
    ) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-210 + distance}px)`;
    }
  };
  return (
    <div className="list">
      <span className="listTitle">{list.title}</span>
      <div className="wrapper">
        {slideNumber > 0 && (
          <MdArrowBackIosNew
            className="sliderArrow left"
            onClick={() => handleClick("left")}
            style={{ display: !isMoved && "none" }}
          />
        )}
        <div className="container" ref={listRef}>
          {list.content.map((item, index) => (
            <ListItem key={index} index={index} item={item} />
          ))}
        </div>
        {slideNumber < list.content.length - clickLimit && (
          <MdArrowForwardIos
            className="sliderArrow right"
            onClick={() => handleClick("right")}
          />
        )}
      </div>
    </div>
  );
};

export default List;
