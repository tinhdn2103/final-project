import "./movieList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Add } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  deleteMovie,
  getMovies,
  movieSelector,
} from "../../store/reducers/movieSlice";

const MovieList = () => {
  const { movies } = useSelector(movieSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteMovie(id));
  };

  const columns = [
    // { field: "_id", headerName: "ID", width: 90 },
    {
      field: "movie",
      headerName: "Phim",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Thể loại", width: 110 },
    { field: "year", headerName: "Năm", width: 100 },
    { field: "limit", headerName: "Giới hạn", width: 100 },
    { field: "isSeries", headerName: "Series", width: 100 },
    {
      field: "action",
      headerName: "Chỉnh sửa",
      width: 130,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/movie/" + params.row._id} state={{ movie: params.row }}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
    {
      field: "actor",
      headerName: "Diễn viên",
      width: 90,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={"/addActor/" + params.row._id}
              state={{ movie: params.row }}
            >
              <button className="productListEdit">Xem</button>
            </Link>
          </>
        );
      },
    },
    {
      field: "video",
      headerName: "Video",
      width: 90,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={"/addVideo/" + params.row._id}
              state={{ movie: params.row }}
            >
              <Add className="addVideoBtn" />
            </Link>
          </>
        );
      },
    },
  ];
  return (
    <div className="movieListWrapper">
      <div className="movieListContainer">
        <h1 className="movieListTitle">Phim</h1>
        <Link to="/newMovie">
          <button className="movieAddButton">Tạo mới</button>
        </Link>
      </div>
      {movies && (
        <div className="movieList">
          <DataGrid
            rows={movies}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            getRowId={(r) => r._id}
          />
        </div>
      )}
    </div>
  );
};

export default MovieList;
