import React, { useEffect, useState } from "react";
import { ICourse } from "../../interfaces/ICourse";
import { getUserCoursesAPI } from "../../server/server";
import { useNavigate, useParams } from "react-router";
import "./user-courses.scss";
import AllCourses from "./AllCourses";

// type UserCoursesProps = {
//   id: number;
// };

const UserCourses: React.FC = () => {
  const navigate = useNavigate();
  const value = useParams();
  const id = Number(value.id);
  const [showAll, setShowAll] = useState(false);
  const [userCourses, setUserCourses] = useState<ICourse[]>([]);
  useEffect(() => {
    const fetchUserCourses = async () => {
      const courses = await getUserCoursesAPI(id);
      setUserCourses(courses);
    };
    fetchUserCourses();
  }, [id]);

  return (
    <div className="user-courses">
      {showAll && <AllCourses />}
      <h1>User Courses</h1>
      <table className="user-courses__table">
        <thead className="user-courses__table__header">
          <tr>
            <th>Language</th>
            <th>Level</th>
          </tr>
          {userCourses.map((course) => (
            <tr className="user-courses__table__row" key={course.id}>
              <td className="user-courses__table__row__lang">
                {course.language}
              </td>
              <td className="user-courses__table__row__level">
                {course.level}
              </td>
              <td
                onClick={() => {
                  navigate("/user-courses/" + id + "/" + course.id);
                }}
              >
                {">"}
              </td>
            </tr>
          ))}
        </thead>
      </table>

      <button
        className="user-courses__"
        onClick={() => {
          setShowAll(true);
        }}
      >
        Join new
      </button>
    </div>
  );
};

export default UserCourses;
