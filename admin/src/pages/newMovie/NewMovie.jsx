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
    if (
      !movie.current ||
      !movie.current.title ||
      !movie.current.duration ||
      !img ||
      !trailer
    ) {
      dispatch(
        addNoti({
          id: v4(),
          type: "ERROR",
          message: "Vui l??ng ??i???n ?????y ????? th??ng tin",
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
      <h1 className="addProductTitle">Phim m???i</h1>
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
          <label>T??n phim</label>
          <input
            type="text"
            placeholder="Nope"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>M?? t???</label>
          <input
            type="text"
            placeholder="M?? t???"
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>N??m</label>
          <input
            type="text"
            placeholder="N??m"
            name="year"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Th??? lo???i</label>
          <input
            type="text"
            placeholder="Th??? lo???i"
            name="genre"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>S??? t???p</label>
          <input
            type="text"
            placeholder="S??? t???p"
            name="epNum"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Th???i l?????ng 1 t???p</label>
          <input
            type="text"
            placeholder="Th???i l?????ng 1 t???p"
            name="duration"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Gi???i h???n</label>
          <input
            type="text"
            placeholder="Gi???i h???n"
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
            Th??m phim
          </button>
        )}
      </form>
    </div>
  );
};

export default NewMovie;
