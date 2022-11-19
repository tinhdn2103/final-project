import "./info.scss";
import React, { useState } from "react";

import { BiCommentDetail, BiShare } from "react-icons/bi";
import ListEps from "../listEps/ListEps";
import ModalRating from "../modal/ModalRating";
import { Rating } from "react-simple-star-rating";
import { useDispatch, useSelector } from "react-redux";
import { createComments, movieSelector } from "../../store/reducers/movieSlice";
import { authSelector } from "../../store/reducers/authSlice";
import ListRecommendByMovie from "../listEps/ListRecommendByMovie";

const Info = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { movie, currentEp, actors, comments } = useSelector(movieSelector);
  const { user } = useSelector(authSelector);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const value = e.target.value;
    setComment(value);
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      dispatch(
        createComments({ movie: movie._id, user: user._id, comment: comment })
      );
      setComment("");
    }
  };

  return (
    <div className="info-wrapper">
      <div className="info">
        <div className="info-left">
          <h1 className="title">{movie.title}</h1>
          <div className="views-rating">
            <div className="views">
              <span>{movie.countView}</span>
              <span>lượt xem</span>
            </div>
            <div className="rating">
              <span className="rating-summary">{movie.rate}</span>
              <div
                className="rating-selection"
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                <Rating
                  iconsCount={5}
                  initialValue={movie.rate}
                  size={18}
                  fillColor="yellow"
                  readonly={true}
                  allowFraction={true}
                />
              </div>
              {modalOpen && <ModalRating setOpenModal={setModalOpen} />}
            </div>
          </div>
          <div className="tags-group">
            <label className="tags">
              <span>{movie.year}</span>
            </label>
            <label className="tags">
              <span>{movie.limit}</span>
            </label>
            <label className="tags">
              <span>{movie.genre}</span>
            </label>
          </div>
          <h2 className="ep-title">Tập {currentEp}</h2>
          <div className="info-desc"></div>
        </div>
        <div className="info-right">
          <a href="#comment-section" className="comments">
            <span className="icon">
              <BiCommentDetail size={30} />
              <span className="count">{comments.length}</span>
            </span>
            <span>Bình luận</span>
          </a>

          <a href="" className="share">
            <span className="icon">
              <BiShare size={30} />
            </span>
            <span>Chia sẻ</span>
          </a>
        </div>
      </div>
      <section className="list-section">
        <div className="section-body">
          <div className="list">
            <ListEps />
            <ListRecommendByMovie />
          </div>
          <div className="list">
            <div className="list-header">
              <span>Diễn viên</span>
            </div>

            <div className="list-actor">
              {actors.map((item, index) => (
                <div key={index} className="actor">
                  <div className="actor-img">
                    <img src={item.actor.img} alt="" />
                  </div>
                  <span>{item.actor.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="comment-section" id="comment-section">
        <div className="section-header">
          <h4>Bình luận</h4>
        </div>
        <div className="section-body">
          <form className="comment-form">
            <div className="avatar">
              <img
                src={
                  user.profilePic ||
                  "https://firebasestorage.googleapis.com/v0/b/movie-web-fadf1.appspot.com/o/avatar_default.jpg?alt=media&token=58615de8-5e1d-4bc1-bf89-0ce4fdf004f3"
                }
                alt=""
              />
            </div>
            <div className="field">
              <textarea
                placeholder="Thêm bình luận..."
                rows="3"
                cols="150"
                value={comment}
                onChange={handleChange}
                onKeyDown={handleEnter}
              ></textarea>
            </div>
          </form>
          <div className="comment">
            {comments.map((item, index) => (
              <div key={index} className="comment-item">
                <div className="avatar">
                  <img
                    src={
                      item.user.profilePic ||
                      "https://firebasestorage.googleapis.com/v0/b/movie-web-fadf1.appspot.com/o/avatar_default.jpg?alt=media&token=58615de8-5e1d-4bc1-bf89-0ce4fdf004f3"
                    }
                    alt=""
                  />
                </div>
                <div className="content">
                  <span>{item.user.username}</span>
                  <p>{item.comment}</p>
                </div>
                <div className="time">
                  <span>
                    {new Date(item.createdAt).toISOString().split("T")[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Info;
