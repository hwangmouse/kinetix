// src/App.jsx
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UploadPage from "./pages/UploadPage";
import ResultPage from "./pages/ResultPage";

function App() {
  return (
    <div className="app-root">
      <Header />
      <ResultPage />
      <Footer />
    </div>
  );
}

export default App;
