import "./listListMovie.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Add } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteList,
  getLists,
  listSelector,
} from "../../store/reducers/listSlice";

const ListListMovie = () => {
  const { lists } = useSelector(listSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLists());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteList(id));
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "title", headerName: "Tiêu đề", width: 250 },
    { field: "genre", headerName: "Thể loại", width: 150 },
    { field: "type", headerName: "Movie hay Series", width: 150 },
    {
      field: "action",
      headerName: "Chỉnh sửa",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/list/" + params.row._id} state={{ list: params.row }}>
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
      field: "listMovie",
      headerName: "Thêm phim",
      width: 90,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={"/addListMovie/" + params.row._id}
              state={{ list: params.row }}
            >
              <Add className="addMovieBtn" />
            </Link>
          </>
        );
      },
    },
  ];
  return (
    <div className="listListWrapper">
      <div className="listListContainer">
        <h1 className="listListTitle">Danh sách</h1>
        <Link to="/newList">
          <button className="listListAddButton">Tạo mới</button>
        </Link>
      </div>
      {lists && (
        <div className="listList">
          <DataGrid
            rows={lists}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            checkboxSelection
            getRowId={(r) => r._id}
          />
        </div>
      )}
    </div>
  );
};

export default ListListMovie;
