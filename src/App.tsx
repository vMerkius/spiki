import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./shared.scss";

// import { useState } from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import Navbar from "./components/Navbar/Navbar";
import UserCourses from "./components/User/UserCourses";

function App() {
  return (
    <Router>
      <div className="page-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/user-courses/:id" element={<UserCourses />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
