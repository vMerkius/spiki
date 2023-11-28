import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./shared.scss";

// import { useState } from "react";
import UserForm from "./components/UserForm/UserForm";
import Navbar from "./components/Navbar/Navbar";
import UserCourses from "./components/User/UserCourses";
import Loading from "./components/shared/Loading";
import Dictionary from "./components/Dictionary/Dictionary";
import CourseMainPage from "./components/Course/CourseMainPage";
import LearningMode from "./components/Course/LearningMode";

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
          <Route
            path="/user-courses/:id/:courseId/:moduleId/learning"
            element={<LearningMode />}
          />
          {/* <Route
            path="/user-courses/:id/:courseId/:moduleId/flashcards/:flashcardId"
            element={<Flashcards />}
          />
          <Route
            path="/user-courses/:id/:courseId/:moduleId/lessons"
            element={<Lessons />}
          /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
