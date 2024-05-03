import React, { useState, useRef } from "react";
import QRCode from "qrcode.react";
import { jsPDF } from "jspdf";

function CreateQR() {
  const [inputText, setInputText] = useState("");
  const qrRef = useRef();

  const downloadImage = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      if (canvas) {
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = "qrcode.png";
        link.href = image;
        link.click();
      }
    }
  };

  const downloadPDF = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      if (canvas) {
        const image = canvas.toDataURL("image/jpeg");
        const pdf = new jsPDF();
        pdf.addImage(image, "JPEG", 10, 10, 180, 180); // Adjust size accordingly
        pdf.save("qrcode.pdf");
      }
    }
  };

  return (
    <div className="qr-generator">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text for QR Code"
      />
      {inputText && (
        <>
          <div ref={qrRef}>
            <QRCode value={inputText} size={256} />
          </div>
          <button onClick={downloadImage}>Download as Image</button>
          <button onClick={downloadPDF}>Download as PDF</button>
        </>
      )}
    </div>
  );
}

export default CreateQR;
