import React, { useEffect, useState } from "react";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  getListRecommend,
  getListTrending,
  getRandomLists,
  listsSelector,
} from "../../store/reducers/listsSlice";
import ListSpecial from "../../components/list/ListSpecial";

const Home = ({ type }) => {
  const [genre, setGenre] = useState(null);
  const { lists, listRecommend, listTrending } = useSelector(listsSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRandomLists({ type, genre }));
  }, [type, genre, dispatch]);

  useEffect(() => {
    dispatch(getListRecommend());
    dispatch(getListTrending());
  }, [dispatch]);

  return (
    <div className="home">
      <Navbar setGenre={setGenre} />
      <Featured type={type} setGenre={setGenre} />
      <ListSpecial list={listTrending} title={"Xu hướng"} />
      <ListSpecial list={listRecommend} title={"Đề xuất cho bạn"} />
      {lists.map((list) => (
        <List key={list._id} list={list} />
      ))}
    </div>
  );
};

export default Home;
