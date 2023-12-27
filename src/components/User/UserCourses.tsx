import React, { useEffect, useState } from "react";
import { ICourse } from "../../interfaces/ICourse";
import { getUserCoursesAPI } from "../../server/server";
import { useNavigate, useParams } from "react-router";
import "./user-courses.scss";
import AllCourses from "./AllCourses";

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
      {showAll && <AllCourses setShowAll={setShowAll} />}
      <h1>Twoje kursy:</h1>

      {userCourses.length !== 0 ? (
        <table className="user-courses__table">
          <thead className="user-courses__table__header">
            <tr>
              <th>Język</th>
              <th>Poziom</th>
            </tr>
          </thead>
          <tbody>
            {userCourses.map((course) => (
              <tr className="user-courses__table__row" key={course.id}>
                <td className="user-courses__table__row__lang">
                  {course.language}
                </td>
                <td className="user-courses__table__row__level">
                  {course.level}
                </td>
                <td
                  className="user-courses__table__row__continue"
                  onClick={() => {
                    navigate("/user-courses/" + id + "/" + course.id);
                  }}
                >
                  Kontynuuj &rarr;
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2>Nie jesteś zapisany na żaden kurs</h2>
      )}

      <button
        className="user-courses__join"
        onClick={() => {
          setShowAll(true);
        }}
      >
        Dołącz do kursu
      </button>
    </div>
  );
};

export default UserCourses;
