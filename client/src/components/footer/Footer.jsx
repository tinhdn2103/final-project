import "./footer.scss";
import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-wrapper">
        <div className="site-footer">
          <p className="footer-top">
            <a className="footer-top-a" href="#">
              Bạn có câu hỏi? Liên hệ với chúng tôi.
            </a>
          </p>
          <ul className="footer-links">
            <li className="footer-link-item">
              <a className="footer-link" href="#">
                <span className="footer-label">Điều khoản sử dụng</span>
              </a>
            </li>
            <li className="footer-link-item">
              <a className="footer-link" href="#">
                <span className="footer-label">Trung tâm trợ giúp</span>
              </a>
            </li>
            <li className="footer-link-item">
              <a className="footer-link" href="#">
                <span className="footer-label">Quan hệ với nhà đầu tư</span>
              </a>
            </li>
            <li className="footer-link-item">
              <a className="footer-link" href="#">
                <span className="footer-label">Thông tin doanh nghiệp</span>
              </a>
            </li>
            <li className="footer-link-item">
              <a className="footer-link" href="#">
                <span className="footer-label">Thông báo pháp lý</span>
              </a>
            </li>
            <li className="footer-link-item">
              <a className="footer-link" href="#">
                <span className="footer-label">Tài khoản</span>
              </a>
            </li>
            <li className="footer-link-item">
              <a className="footer-link" href="#">
                <span className="footer-label">Việc làm</span>
              </a>
            </li>
            <li className="footer-link-item">
              <a className="footer-link" href="#">
                <span className="footer-label">Quyền riêng tư</span>
              </a>
            </li>
            <li className="footer-link-item">
              <a className="footer-link" href="#">
                <span className="footer-label">Câu hỏi thường gặp</span>
              </a>
            </li>
            <li className="footer-link-item">
              <a className="footer-link" href="#">
                <span className="footer-label">Liên hệ với chúng tôi</span>
              </a>
            </li>
            <li className="footer-link-item">
              <a className="footer-link" href="#">
                <span className="footer-label">Trung tâm đa phương tiện</span>
              </a>
            </li>
            <li className="footer-link-item">
              <a className="footer-link" href="#">
                <span className="footer-label">Góp ý</span>
              </a>
            </li>
          </ul>
          <p className="footer-logo">Movie Website</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
