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
                <strong>Nazwa: </strong>
                {user.name}
              </p>
              <p>
                <strong>Email: </strong>
                {user.email}
              </p>
              <p>
                <strong>Data urodzenia: </strong>
                {user.dateOfBirth.toString().split("T")[0]}
              </p>
            </div>

            <div>
              <p>
                <strong>Wiek: </strong>
                {age}
              </p>
              <p>
                <strong>Płeć: </strong>
                {user.gender}
              </p>
              <p>
                <strong>Kraj: </strong>
                {user.country}
              </p>
            </div>
          </div>
          <button
            className="change-password-btn"
            onClick={() => {
              setChangePassword(!changePassword);
            }}
          >
            Zmień hasło
          </button>
          {changePassword && (
            <div className="user-details-container__main__info__change-password">
              <input
                className="user-details-container__main__info__change-password__input"
                type="password"
                placeholder="Stare hasło"
              />
              <input
                className="user-details-container__main__info__change-password__input"
                type="password"
                placeholder="Nowe hasło"
              />
              <input
                className="user-details-container__main__info__change-password__input"
                type="password"
                placeholder="Powtórz hasło"
              />
              <button className="change-password-btn change-password-btn--send">
                Potwierdź
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="user-details-container__courses">
        <h1>Kursy:</h1>
        <ul className="user-details-container__courses__list">
          {userCourses.map((course) => (
            <li
              key={course.id}
              title="Course details"
              onClick={() => {
                navigate(`/user-courses/${id}/${course.id}`);
              }}
              className="user-details-container__courses__list__item"
            >
              <p className="user-details-container__courses__list__item__navi">
                {course.language} - {course.level} &rarr;
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDetails;
