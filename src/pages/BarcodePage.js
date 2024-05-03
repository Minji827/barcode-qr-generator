import React from "react";
import CreateBarcode from "../Components/CreateBarcode";
import "./BarcodePage.css"; // CSS 임포트 확인

function BarcodePage() {
  return (
    <div className="barcode-page">
      <h1>Barcode Generator</h1>
      <CreateBarcode />
    </div>
  );
}

export default BarcodePage;
