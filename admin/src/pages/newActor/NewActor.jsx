import "./newActor.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import storage from "../../firebase";
import { addNoti } from "../../store/reducers/notiSlice";
import { v4 } from "uuid";
import {
  actorSelector,
  createActor,
  deleteActor,
  getActors,
} from "../../store/reducers/actorSlice";

const NewActor = () => {
  const actors = useSelector(actorSelector);

  const dispatch = useDispatch();

  const actor = useRef(null);

  const [img, setImg] = useState(null);
  const [progress, setProgress] = useState(0);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    dispatch(getActors());
  }, [dispatch]);

  useEffect(() => {
    setSubmit(false);
  }, [actors]);

  const handleDelete = (id) => {
    dispatch(deleteActor(id));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    actor.current = { ...actor.current, [e.target.name]: value };
  };

  const handleUpload = () => {
    const fileName = new Date().getTime() + img.name;
    const uploadTask = storage.ref(`/actor/${fileName}`).put(img);
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
          actor.current = { ...actor.current, img: url };
          dispatch(createActor(actor.current));
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!actor.current || !actor.current.name || !img) {
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
    // { field: "_id", headerName: "ID", width: 200 },
    {
      field: "actor",
      headerName: "Diễn viên",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "desc", headerName: "Mô tả", width: 230 },
    {
      field: "action",
      headerName: "Xóa",
      width: 90,
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
    <div className="newActor">
      {actors && (
        <div className="actorList">
          <DataGrid
            rows={actors}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            getRowId={(r) => r._id}
          />
        </div>
      )}
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Tên</label>
          <input
            type="text"
            placeholder="Tên diễn viên"
            name="name"
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
          <label>Ảnh</label>
          <input
            type="file"
            name="img"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          {submit ? (
            <div className="loader"></div>
          ) : (
            <button className="addActorButton" onClick={handleSubmit}>
              Thêm diễn viên
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NewActor;
