import React from "react";
import CreateQR from "../Components/CreateQR";
import "./QRCodePage.css"; // CSS 임포트 확인

function QRCodePage() {
  return (
    <div className="qrcode-page">
      <h1>QR Code Generator</h1>
      <CreateQR />
    </div>
  );
}

export default QRCodePage;
