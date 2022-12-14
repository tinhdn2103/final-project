import React, { useEffect, useState } from "react";
import SearchItem from "../../components/listItem/SearchItem";
import Navbar from "../../components/navbar/Navbar";
import "./search.scss";
import axios from "../../apiClient";

const Search = () => {
  const [myList, setMyList] = useState([]);
  useEffect(() => {
    const getMyList = async () => {
      try {
        const res = await axios.get("/myList/find");
        setMyList(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMyList();
  }, []);
  return (
    <div className="search">
      <Navbar />
      <div className="title-search">
        <h3>Danh sách của tôi</h3>
      </div>
      <div className="listSearch">
        {myList.map((item, index) => (
          <SearchItem key={index} index={index} item={item.movie._id} />
        ))}
      </div>
    </div>
  );
};

export default Search;
