import React, { useEffect, useState } from "react";
import "./service.scss";
import { BsFillLaptopFill } from "react-icons/bs";
import axios from "../../apiClient";

const Service = () => {
  const [listService, setListService] = useState([]);
  useEffect(() => {
    const getServices = async () => {
      try {
        const res = await axios.get("/service/list");
        setListService(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getServices();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const payment = async () => {
      try {
        const res = await axios.post("/payment", listService[e.target.value]);
        window.location.assign(res.data.link);
      } catch (error) {
        console.log(error);
      }
    };
    payment();
  };
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://firebasestorage.googleapis.com/v0/b/movie-web-fadf1.appspot.com/o/logo_nobg.png?alt=media&token=1de4bd0b-097f-4aac-ad2d-b15e4f8d3608"
            alt=""
          />
          <button className="loginButton">Đăng xuất</button>
        </div>
      </div>
      <div className="chooseService">
        <h1 className="title">Chọn gói dịch vụ phù hợp với bạn</h1>
        <div className="listService">
          {listService.map((item, index) => (
            <div key={index} className="price-box">
              <BsFillLaptopFill className="icon" />
              <div className="months">{item.name}</div>
              <div className="price">
                <b>{item.price}</b>
                <span>$</span>
                <small>{item.month} tháng</small>
              </div>
              {/* <div className="discount">Discount 6%</div> */}
              <div className="note">
                {/* <u>300.000₫</u> */}
                <br />
                {item.desc}
              </div>
              <button value={index} onClick={handleClick}>
                ĐĂNG KÝ GÓI
              </button>
              <div className="desc">
                Thay đổi hoặc hủy gói dịch vụ của bạn bất cứ khi nào.
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
