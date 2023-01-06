import "./addVideo.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import storage from "../../firebase";
import { useLocation } from "react-router-dom";
import {
  createEp,
  deleteEp,
  epSelector,
  getEps,
} from "../../store/reducers/epSlice";
import { addNoti } from "../../store/reducers/notiSlice";
import { v4 } from "uuid";

const AddVideo = () => {
  const location = useLocation();
  const { movie } = location.state;
  const listEps = useSelector(epSelector);

  const dispatch = useDispatch();

  // const [ep, setEp] = useState({ movie: movie._id });
  const ep = useRef({ movie: movie._id });

  const [video, setVideo] = useState(null);
  const [progress, setProgress] = useState(0);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    dispatch(getEps(movie._id));
  }, [dispatch]);

  useEffect(() => {
    setSubmit(false);
  }, [listEps]);

  const handleDelete = (id) => {
    dispatch(deleteEp(id));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    ep.current = { ...ep.current, [e.target.name]: value };
  };

  const handleUpload = () => {
    const fileName = new Date().getTime() + video.name;
    const uploadTask = storage
      .ref(`/video/${movie._id}/${fileName}`)
      .put(video);
    uploadTask.on(
      "state_change",
      (snapshot) => {
        const prg = (
          (snapshot.bytesTransferred / snapshot.totalBytes) *
          100
        ).toFixed(0);
        console.log("Upload is " + prg + "% done");
        setProgress(prg);
      },
      (error) => {
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          ep.current = { ...ep.current, video: url };
          dispatch(createEp(ep.current));
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ep.current || !ep.current.ep || !ep.current.title || !video) {
      dispatch(
        addNoti({
          id: v4(),
          type: "ERROR",
          message: "Vui lòng điền đầy đủ thông tin",
          title: "Error Request",
        })
      );
    } else {
      setSubmit(true);
      handleUpload();
    }
  };

  const columns = [
    {
      field: "ep",
      headerName: "Tập",
      width: 150,
    },
    { field: "title", headerName: "Tiêu đề", width: 250 },
    { field: "desc", headerName: "Mô tả", width: 250 },
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
    <div className="addVideo">
      {listEps && (
        <div className="videoList">
          <DataGrid
            rows={listEps}
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
          <label>Chọn tập</label>
          <select name="ep" id="ep" onChange={handleChange}>
            <option value="">Tập</option>
            {[...Array(movie.epNum)].map((x, index) => (
              <option key={index} value={index + 1}>
                Tập {index + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="addProductItem">
          <label>Tiêu đề</label>
          <input
            type="text"
            placeholder="Tiêu đề"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Mô tả</label>
          <input
            type="text"
            placeholder="Mô tả"
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input
            type="file"
            name="video"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>
        {submit ? (
          <div className="loader"></div>
        ) : (
          <button className="addProductButton" onClick={handleSubmit}>
            Thêm tập
          </button>
        )}
      </form>
    </div>
  );
};

export default AddVideo;
