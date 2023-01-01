import React, { useRef, useState } from "react";
import "./list.scss";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import ListItem from "../listItem/ListItem";
import { useEffect } from "react";
import axios from "../../apiClient";

const List = ({ list }) => {
  const [isMoved, setIsMoved] = useState(false);

  const [slideNumber, setSlideNumber] = useState(0);

  const [clickLimit, setClickLimit] = useState(window.innerWidth / 210);

  const [listMovies, setListMovies] = useState([]);

  const listRef = useRef();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await axios.get("/listMovie/list/" + list._id);
        setListMovies(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, [list]);

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${210 + distance}px)`;
    }
    if (direction === "right" && slideNumber < listMovies.length - clickLimit) {
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
          {listMovies.map((item, index) => (
            <ListItem key={index} index={index} item={item.movie._id} />
          ))}
        </div>
        {slideNumber < listMovies.length - clickLimit && (
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
