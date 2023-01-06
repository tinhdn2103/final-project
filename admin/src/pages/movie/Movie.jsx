import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./movie.css";
import { Publish } from "@material-ui/icons";
import storage from "../../firebase";
import { v4 } from "uuid";
import { useDispatch } from "react-redux";
import { addNoti } from "../../store/reducers/notiSlice";
import { updateMovie } from "../../store/reducers/movieSlice";

const Movie = () => {
  const location = useLocation();
  const { movie } = location.state;
  const newMovie = useRef(movie);
  const items = useRef([]);
  const [img, setImg] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [src, setSrc] = useState(movie.img);
  const [uploaded, setUploaded] = useState(0);
  const [progress, setProgress] = useState(0);
  const [submit, setSubmit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (img) {
      const objectUrl = URL.createObjectURL(img);
      setSrc(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [img]);

  const handleChange = (e) => {
    const value = e.target.value;
    newMovie.current = { ...newMovie.current, [e.target.name]: value };
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
            newMovie.current = { ...newMovie.current, [item.label]: url };
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };
  useEffect(() => {
    if (
      (items.current.length === 1 && uploaded === 1) ||
      (items.current.length === 2 && uploaded === 2)
    ) {
      dispatch(updateMovie(newMovie.current));
      navigate("/movies");
    }
  }, [uploaded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMovie.current.title) {
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
      img && items.current.push({ file: img, label: "img" });
      trailer && items.current.push({ file: trailer, label: "trailer" });
      if (items.current.length > 0) {
        upload(items.current);
      } else {
        dispatch(updateMovie(newMovie.current));
        navigate("/movies");
      }
    }
  };
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Phim</h1>
        <Link to="/newMovie">
          <button className="productAddButton">Tạo mới</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={movie.img} alt="" className="productInfoImg" />
            <span className="productName">{movie.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">ID:</span>
              <span className="productInfoValue">{movie._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Thể loại:</span>
              <span className="productInfoValue">{movie.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Năm:</span>
              <span className="productInfoValue">{movie.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Giới hạn</span>
              <span className="productInfoValue">{movie.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Tên phim</label>
            <input
              name="title"
              type="text"
              defaultValue={movie.title}
              onChange={handleChange}
            />
            <label>Năm</label>
            <input
              name="year"
              type="text"
              defaultValue={movie.year}
              onChange={handleChange}
            />
            <label>Thể loại</label>
            <input
              name="genre"
              type="text"
              defaultValue={movie.genre}
              onChange={handleChange}
            />
            <label>Giới hạn</label>
            <input
              name="limit"
              type="text"
              defaultValue={movie.limit}
              onChange={handleChange}
            />

            <label>Trailer</label>
            <input
              type="file"
              name="trailer"
              onChange={(e) => setTrailer(e.target.files[0])}
            />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={src} alt="" className="productUploadImg" />

              <input
                type="file"
                id="img"
                name="img"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>
            {submit ? (
              <div className="loader"></div>
            ) : (
              <button className="productButton" onClick={handleSubmit}>
                Cập nhật
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Movie;
