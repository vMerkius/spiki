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
import UserDetails from "./components/User/UserDetails/UserDetails";
import ProtectedRoute from "./ProtectedRoute";
import Contact from "./components/Contact/Contact";

function App() {
  return (
    <Router>
      <div className="page-container">
        <Navbar />
        {/* <Loading></Loading> */}
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route
            path="/user-courses/:id"
            element={
              <ProtectedRoute>
                <UserCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-courses/:id/:courseId"
            element={
              <ProtectedRoute>
                <CourseMainPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="user-details/:id"
            element={
              <ProtectedRoute>
                <UserDetails />{" "}
              </ProtectedRoute>
            }
          />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
