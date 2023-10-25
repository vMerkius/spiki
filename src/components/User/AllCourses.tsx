import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCoursesAPI } from "../../server/server";

const PAGE_SIZE = 10;

interface Course {
  id: number;
  name: string;
  description: string;
}

const AllCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      const fetchedCourses = await getCoursesAPI();
      setCourses(fetchedCourses);
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Search courses"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h3>{course.name}</h3>
            <p>{course.description}</p>
          </li>
        ))}
      </ul>
      {/* <div>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              disabled={pageNumber === currentPage}
            >
              {pageNumber}
            </button>
          )
        )}
      </div> */}
    </div>
  );
};

export default AllCourses;
