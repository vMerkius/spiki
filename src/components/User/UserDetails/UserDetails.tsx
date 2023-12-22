import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import UserIcon from "../../../assets/user-icon.svg";

import "./user-details.scss";
import { IUser } from "../../../interfaces/IUser";
import { ICourse } from "../../../interfaces/ICourse";
import {
  getUserAPI,
  getUserAgeAPI,
  getUserCoursesAPI,
} from "../../../server/server";

const UserDetails = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>({
    id: 0,
    name: "",
    email: "",
    password: "",
    dateOfBirth: new Date(),
    gender: "",
    country: "",
    imageUrl: "",
  });
  const [age, setAge] = useState<number>(0);
  const [userCourses, setUserCourses] = useState<ICourse[]>([]);
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const value = useParams();
  const id = Number(value.id);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedAge = await getUserAgeAPI(id);
      const fetchedUser = await getUserAPI(id);
      setAge(fetchedAge);
      setUser(fetchedUser);
      const fetchedUserCourses = await getUserCoursesAPI(id);
      setUserCourses(fetchedUserCourses);
    };
    fetchData();
  }, [id]);

  return (
    <div className="user-details-container">
      <div className="user-details-container__main">
        {user.imageUrl == "" ? (
          <img src={UserIcon} alt="user icon" width="300px" />
        ) : (
          <img src={user.imageUrl} alt="user icon" width="300px" />
        )}
        <div className="user-details-container__main__info">
          <h1>Szczegóły</h1>
          <div className="user-details-container__main__info__sections">
            <div>
              <p>
                <strong>Name: </strong>
                {user.name}
              </p>
              <p>
                <strong>Email: </strong>
                {user.email}
              </p>
              <p>
                <strong>Date of birth: </strong>
                {user.dateOfBirth.toString().split("T")[0]}
              </p>
            </div>

            <div>
              <p>
                <strong>Age: </strong>
                {age}
              </p>
              <p>
                <strong>Gender: </strong>
                {user.gender}
              </p>
              <p>
                <strong>Country: </strong>
                {user.country}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setChangePassword(true);
            }}
          >
            Zmień hasło
          </button>
          {changePassword && (
            <div className="user-details-container__main__info__change-password">
              <input type="password" placeholder="Stare hasło" />
              <input type="password" placeholder="Nowe hasło" />
              <input type="password" placeholder="Powtórz hasło" />
              <button>Zmień</button>
            </div>
          )}
        </div>
      </div>
      <h1>Kursy:</h1>
      <ul className="user-details-container__courses">
        {userCourses.map((course) => (
          <li
            key={course.id}
            title="Course details"
            onClick={() => {
              navigate(`/courses/${course.id}`);
            }}
            className="user-details-container__courses__item"
          >
            <h2 className="user-details-container__courses__item__navi">
              {course.language}-{course.level}
            </h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetails;
