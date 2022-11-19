import React from "react";
import { useSelector } from "react-redux";
import { notiSelector } from "../../store/reducers/notiSlice";
import Notification from "./Notification";
import "./notification.scss";

const StackNotifications = () => {
  const { listNoti } = useSelector(notiSelector);
  return (
    <div className="notification-wrapper">
      {listNoti.map((noti) => {
        return <Notification key={noti.id} noti={noti} />;
      })}
    </div>
  );
};

export default StackNotifications;
