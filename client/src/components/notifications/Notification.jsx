import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeNoti } from "../../store/reducers/notiSlice";
import "./notification.scss";
import { IoMdClose } from "react-icons/io";

const Notification = ({ noti }) => {
  const [exit, setExit] = useState(false);
  const [width, setWidth] = useState(0);
  const [intervalID, setIntervalID] = useState(null);
  const dispatch = useDispatch();
  const handleStartTimer = () => {
    const id = setInterval(() => {
      setWidth((prev) => {
        if (prev < 100) {
          return prev + 0.5;
        }

        clearInterval(id);
        return prev;
      });
    }, 20);
    setIntervalID(id);
  };
  const handlePauseTimer = () => {
    clearInterval(intervalID);
  };

  const handleCloseNotification = () => {
    handlePauseTimer();
    setExit(true);
    setTimeout(() => {
      dispatch(removeNoti(noti.id));
    }, 400);
  };

  useEffect(() => {
    if (width === 100) {
      handleCloseNotification();
    }
  }, [width]);

  useEffect(() => {
    handleStartTimer();
  }, []);

  return (
    <div
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
      className={`notification-item ${
        noti.type === "SUCCESS" ? "success" : "error"
      } ${exit ? "exit" : ""}`}
    >
      <div className="content-noti">
        <p>{noti.message}</p>

        <IoMdClose
          className="close-noti"
          size={20}
          onClick={() => {
            handleCloseNotification();
          }}
        />
      </div>
      <div className={"bar"} style={{ width: `${width}%` }} />
    </div>
  );
};

export default Notification;
