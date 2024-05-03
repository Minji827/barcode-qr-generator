import React from "react";
import { Link } from "react-router-dom";
import "./MenuBar.css";

function MenuBar() {
  return (
    <div className="menu-bar">
      <div className="menu-contents">
        <div className="menu-title">
          <Link to="/">Create Barcode, QRcode</Link>
        </div>
        <div className="menu-list">
          <div className="menu-item">
            <Link to="/barcode">바코드 생성</Link>
          </div>
          <div className="menu-item">
            <Link to="/qrcode">QR코드 생성</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuBar;
