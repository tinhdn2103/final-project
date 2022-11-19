import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchItem from "../../components/listItem/SearchItem";
import Navbar from "../../components/navbar/Navbar";
import "./search.scss";
import axios from "../../apiClient";

const Search = () => {
  const location = useLocation();
  const search = location.state ? location.state.search : "";
  const [listSearch, setListSearch] = useState([]);
  const [isFetch, setIsFetch] = useState(false);
  useEffect(() => {
    const getListSearch = async () => {
      setIsFetch(false);
      setListSearch([]);
      if (search)
        try {
          const res = await axios.get("/movies/search?q=" + search);
          setListSearch(res.data);
        } catch (error) {
          console.log(error);
        }
      setIsFetch(true);
    };
    getListSearch();
  }, [search]);
  return (
    <div className="search">
      <Navbar search={search} />
      <div className="title-search">
        <h3>Các kết quả tìm kiếm</h3>
        {!isFetch && <div className="loader"></div>}
      </div>

      <div className="listSearch">
        {listSearch.map((item, index) => (
          <SearchItem key={index} index={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Search;
