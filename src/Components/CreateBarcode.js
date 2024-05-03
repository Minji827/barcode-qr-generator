import React, { useRef, useState, useEffect } from "react";
import JsBarcode from "jsbarcode";
import { jsPDF } from "jspdf";
import "./CreateBarcode.css"; // CSS 파일 임포트

function CreateBarcode() {
  const [inputText, setInputText] = useState("");
  const [barcodeFormat, setBarcodeFormat] = useState("CODE128");
  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 상태 추가
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (!inputText) {
      setErrorMessage(""); // 입력값이 없는 경우에는 오류 메시지를 초기화합니다.
      return; // 함수 실행 중단
    }

    try {
      JsBarcode(barcodeRef.current, inputText, {
        format: barcodeFormat,
        lineColor: "#000",
        width: 2,
        height: 40,
        displayValue: true,
      });
      setErrorMessage(""); // 바코드가 성공적으로 생성되면 오류 메시지를 초기화합니다.
    } catch (error) {
      setErrorMessage("유효하지 않은 데이터입니다."); // 유효하지 않은 데이터가 감지되면 메시지를 설정합니다.
    }
  }, [inputText, barcodeFormat]);

  const downloadImage = () => {
    const svgElement = barcodeRef.current;
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "barcode.png";
      link.href = pngFile;
      link.click();
    };
    img.src =
      "data:image/svg+xml;base64," +
      btoa(unescape(encodeURIComponent(svgData)));
  };

  const downloadPDF = () => {
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, inputText, {
      format: barcodeFormat,
      displayValue: true,
    });
    const pdf = new jsPDF();
    pdf.addImage(canvas.toDataURL("image/jpeg"), "JPEG", 10, 10);
    pdf.save("barcode.pdf");
  };

  return (
    <div className="barcode-generator">
      <div className="create-barcode">
        <div className="create-barcode-container">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text for Barcode"
          />
          <select
            value={barcodeFormat}
            onChange={(e) => setBarcodeFormat(e.target.value)}
          >
            <option value="CODE128">CODE128</option>
            <option value="CODE39">CODE39</option>
            <option value="EAN13">EAN13</option>
            <option value="EAN8">EAN8</option>
            <option value="UPC">UPC</option>
            <option value="ITF14">ITF14</option>
            <option value="ITF">ITF</option>
            <option value="MSI">MSI</option>
            <option value="MSI10">MSI10</option>
            <option value="MSI11">MSI11</option>
            <option value="MSI1010">MSI1010</option>
            <option value="MSI1110">MSI1110</option>
            <option value="Pharmacode">Pharmacode</option>
          </select>
        </div>
      </div>
      {!errorMessage && inputText && (
        <>
          <svg ref={barcodeRef} />
          <button onClick={downloadImage}>Download as Image</button>
          <button onClick={downloadPDF}>Download as PDF</button>
        </>
      )}
      {errorMessage && (
        <div style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default CreateBarcode;
