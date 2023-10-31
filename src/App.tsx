import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./shared.scss";

// import { useState } from "react";
import UserForm from "./components/UserForm/UserForm";
import Navbar from "./components/Navbar/Navbar";
import UserCourses from "./components/User/UserCourses";
import Loading from "./components/shared/Loading";
import CourseMainPage from "./components/Course/CourseMainPAge";
import Dictionary from "./components/Dictionary/Dictionary";

function App() {
  return (
    <Router>
      <div className="page-container">
        <Navbar />
        {/* <Loading></Loading> */}
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/user-courses/:id" element={<UserCourses />} />
          <Route
            path="/user-courses/:id/:courseId"
            element={<CourseMainPage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
