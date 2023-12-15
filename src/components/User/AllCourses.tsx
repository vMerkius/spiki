import React, { useState, useEffect } from "react";
import {
  getCoursesNonParticipatingAPI,
  joinCourseAPI,
} from "../../server/server";
import { ICourse } from "../../interfaces/ICourse";
import { useParams } from "react-router";

type AllCoursesProps = {
  setShowAll: React.Dispatch<React.SetStateAction<boolean>>;
};

const AllCourses: React.FC<AllCoursesProps> = ({ setShowAll }) => {
  const value = useParams();
  const id = Number(value.id);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<ICourse[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const fetchedCourses = await getCoursesNonParticipatingAPI(id);
      setCourses(fetchedCourses);
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const filteredCoursesSearch = courses.filter((course) =>
      course.language.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filteredCoursesSearch);
  }, [searchTerm, courses]);

  const handleCancel = () => {
    setShowAll(false);
  };

  const handleJoin = async (courseId: number) => {
    console.log(id, courseId);
    const res = await joinCourseAPI(courseId, id);
    if (res === 200) {
      alert("Zostałeś dodany do kursu");

      window.location.reload();
    } else {
      alert("Nie udało się dodać do kursu");
    }
  };

  return (
    <div className="all-courses-container">
      <div className="all-courses-container__window">
        <button className="cancel-btn" onClick={handleCancel}>
          X
        </button>
        <input
          className="input-style all-courses-container__window__input"
          type="text"
          placeholder="Wyszukaj język"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul>
          {filteredCourses.map((course) => (
            <li
              key={course.id}
              onClick={() => {
                handleJoin(course.id);
              }}
            >
              <p>
                {course.language} - {course.level}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllCourses;
