import React, { useState } from "react";
import "./modalRating.scss";
import { IoMdClose } from "react-icons/io";
import { Rating } from "react-simple-star-rating";
import { useDispatch } from "react-redux";
import { setMovie } from "../../store/reducers/movieSlice";
import axios from "../../apiClient";
import { useSelector } from "react-redux";
import { movieSelector } from "../../store/reducers/movieSlice";
import { authSelector } from "../../store/reducers/authSlice";

const ModalRating = ({ setOpenModal }) => {
  const dispatch = useDispatch();
  const { movie } = useSelector(movieSelector);
  const { user } = useSelector(authSelector);
  const [rate, setRate] = useState(0);
  const handleRating = () => {
    const userRating = async () => {
      try {
        const res = await axios.post("/userRating", {
          movie: movie._id,
          user: user._id,
          rating: rate,
        });
        // dispatch(setMovie(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    userRating();
    setOpenModal(false);
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <IoMdClose
            onClick={() => {
              setOpenModal(false);
            }}
          />
        </div>
        <div className="title">
          <p>Hãy cho biết mức độ hài lòng của bạn</p>
        </div>
        <div className="body">
          <Rating onClick={(rate) => setRate(rate)} />
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Hủy
          </button>
          <button onClick={handleRating}>Gửi</button>
        </div>
      </div>
    </div>
  );
};

export default ModalRating;
