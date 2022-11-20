import React, { useEffect, useRef, useState } from "react";
import "./watch.scss";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import Info from "../../components/info/Info";
import { useSelector, useDispatch } from "react-redux";
import {
  getActors,
  getComments,
  getListEps,
  getListRecommend,
  movieSelector,
  setCurrentEp,
  setCurrentTime,
  setMovie,
} from "../../store/reducers/movieSlice";
import axios from "../../apiClient";
import { authSelector } from "../../store/reducers/authSlice";

const Watch = () => {
  // const location = useLocation();
  // const { movie } = location.state;
  const { user } = useSelector(authSelector);
  const { movie, listEps, currentEp, currentTime } = useSelector(movieSelector);
  const dispatch = useDispatch();
  const videoRef = useRef();
  const epRef = useRef(1);
  const timeRef = useRef(10);
  const [time, setTime] = useState(10);

  useEffect(() => {
    const getWatching = async () => {
      try {
        const res = await axios.get("/watching/find", {
          params: { movie: movie._id, user: user._id },
        });

        if (res.data) {
          dispatch(setCurrentTime(res.data.currentTime)); //// set state not synchoronized
          dispatch(setCurrentEp(res.data.ep));
        } else {
          dispatch(setCurrentEp(1));
          dispatch(setCurrentTime(0));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getWatching();
  }, [movie]);

  useEffect(() => {
    videoRef.current.currentTime = currentTime;
  }, [currentTime, listEps]);

  useEffect(() => {
    epRef.current = currentEp;
    timeRef.current = time;
  }, [currentEp, time]);

  //setCurrentTime(videoRef.current.currentTime) ????

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const setWatching = async () => {
  //       try {
  //         await axios.post(
  //           "/watching",
  //           {
  //             movie: movie._id,
  //             user: user._id,
  //             time: timeRef.current,
  //             currentTime: videoRef.current.currentTime,
  //             ep: epRef.current,
  //           },
  //           {
  //             headers: {
  //               Authorization:
  //                 "Bearer " +
  //                 JSON.parse(localStorage.getItem("user")).accessToken,
  //             },
  //           }
  //         );
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  //     setWatching();
  //   }, 10000);

  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    dispatch(setMovie(movie));
    dispatch(getListEps(movie._id));
    dispatch(getActors(movie._id));
    dispatch(getComments(movie._id));
    dispatch(getListRecommend(movie._id));
  }, [movie]);

  return (
    <>
      <div className="watch">
        <Link to="/">
          <div className="back">
            <BiArrowBack size={20} />
            Trang chủ
          </div>
        </Link>

        <video
          className="video"
          autoPlay
          progress="true"
          controls
          ref={videoRef}
          src={
            currentEp <= listEps.length
              ? listEps.at(listEps.findIndex((x) => x.ep === currentEp)).video
              : ""
          }
          onPause={() => setTime(0)}
          onPlay={() => setTime(10)}
          onEnded={() => setTime(0)}
          onError={() => setTime(0)}
        />
      </div>

      <Info />
    </>
  );
};

export default Watch;
