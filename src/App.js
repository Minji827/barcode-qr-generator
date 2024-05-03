import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MenuBar from "./Components/MenuBar";
import BarcodePage from "./pages/BarcodePage";
import QRCodePage from "./pages/QRCodePage";

function App() {
  return (
    <Router>
      <div className="App">
        <MenuBar />
        <Routes>
          {" "}
          {/* 'Switch'를 'Routes'로 변경 */}
          <Route path="/barcode" element={<BarcodePage />} />{" "}
          {/* 'component'를 'element'로 변경 */}
          <Route path="/qrcode" element={<QRCodePage />} />
          <Route path="/" element={<BarcodePage />} /> {/* Default page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
