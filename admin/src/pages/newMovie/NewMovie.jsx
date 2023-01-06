import React, { useEffect, useRef, useState } from "react";
import "./newMovie.css";
import storage from "../../firebase";
import { createMovie } from "../../store/reducers/movieSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNoti } from "../../store/reducers/notiSlice";
import { v4 } from "uuid";

const NewMovie = () => {
  const movie = useRef(null);
  const [img, setImg] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const [submit, setSubmit] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    movie.current = { ...movie.current, [e.target.name]: value };
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.file.name;
      const uploadTask = storage
        .ref(`/${item.label}/${fileName}`)
        .put(item.file);
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
            movie.current = { ...movie.current, [item.label]: url };
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };
  useEffect(() => {
    if (uploaded === 2) {
      dispatch(createMovie(movie.current));
      navigate("/movies");
    }
  }, [uploaded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!movie.current || !movie.current.title || !img || !trailer) {
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
      upload([
        { file: img, label: "img" },
        { file: trailer, label: "trailer" },
      ]);
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Phim mới</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Poster</label>
          <input
            type="file"
            id="img"
            name="img"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>

        <div className="addProductItem">
          <label>Tên phim</label>
          <input
            type="text"
            placeholder="Nope"
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
          <label>Năm</label>
          <input
            type="text"
            placeholder="Năm"
            name="year"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Thể loại</label>
          <input
            type="text"
            placeholder="Thể loại"
            name="genre"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Số tập</label>
          <input
            type="text"
            placeholder="Số tập"
            name="epNum"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Thời lượng 1 tập</label>
          <input
            type="text"
            placeholder="Thời lượng 1 tập"
            name="duration"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Giới hạn</label>
          <input
            type="text"
            placeholder="Giới hạn"
            name="limit"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Series?</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option value="">Series?</option>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input
            type="file"
            name="trailer"
            onChange={(e) => setTrailer(e.target.files[0])}
          />
        </div>
        {submit ? (
          <div className="loader"></div>
        ) : (
          <button className="addProductButton" onClick={handleSubmit}>
            Thêm phim
          </button>
        )}
      </form>
    </div>
  );
};

export default NewMovie;
