import "./addListMovie.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";

import { useEffect, useState } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createListMovie,
  deleteListMovie,
  getMoviesOfList,
  listMovieSelector,
} from "../../store/reducers/listMovieSlice";
import { useLocation } from "react-router-dom";
import { getMovies, movieSelector } from "../../store/reducers/movieSlice";

const AddListMovie = () => {
  const location = useLocation();
  const { list } = location.state;
  const listMovies = useSelector(listMovieSelector);
  const { movies } = useSelector(movieSelector);

  const dispatch = useDispatch();

  const [listMovie, setListMovie] = useState({ list: list._id });

  useEffect(() => {
    dispatch(getMoviesOfList(list._id));
    dispatch(getMovies());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteListMovie(id));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setListMovie({ ...listMovie, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createListMovie(listMovie));
  };

  const columns = [
    {
      field: "movie",
      headerName: "Phim",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.movie.img} alt="" />
            {params.row.movie.title}
          </div>
        );
      },
    },
    { field: "note", headerName: "Chú thích", width: 200 },
    {
      field: "action",
      headerName: "Xóa",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="addMovie">
      {listMovies && (
        <div className="listMovie">
          <DataGrid
            rows={listMovies}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            checkboxSelection
            getRowId={(r) => r._id}
          />
        </div>
      )}
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Phim</label>
          {movies && (
            <select name="movie" id="movie" onChange={handleChange}>
              <option value="">Phim</option>

              {movies.map((movie, index) => (
                <option key={index} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="addProductItem">
          <label>Chú thích</label>
          <input
            type="text"
            placeholder="Chú thích"
            name="character"
            onChange={handleChange}
          />
        </div>
        <button className="addProductButton" onClick={handleSubmit}>
          Thêm
        </button>
      </form>
    </div>
  );
};

export default AddListMovie;
