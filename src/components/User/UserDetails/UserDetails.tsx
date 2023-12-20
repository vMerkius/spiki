import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
// import UserIcon from "../../../../assets/icons/user-icon.svg";

import "./user-details.scss";
import { IUser } from "../../../interfaces/IUser";
import { ICourse } from "../../../interfaces/ICourse";
import { getUserAPI, getUserCoursesAPI } from "../../../server/server";

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
  const [userCourses, setUserCourses] = useState<ICourse[]>([]);
  const value = useParams();
  const id = Number(value.id);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser = await getUserAPI(id);
      setUser(fetchedUser);
      const fetchedUserCourses = await getUserCoursesAPI(id);
      setUserCourses(fetchedUserCourses);
    };
    fetchData();
  }, [id]);

  const getAge = (dateOfBirth: Date) => {
    const dateOfBirthStr = dateOfBirth.toString();
    const datePart = dateOfBirthStr.split("T")[0];
    const [year, month, day] = datePart.split("-").map(Number);
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="user-details-container">
      <div className="user-details-container__main">
        {/* {user.imageUrl == "" ? (
          <img src={UserIcon} alt="user icon" width="300px" />
        ) : (
          <img src={user.imageUrl} alt="user icon" width="300px" />
        )} */}
        <div className="user-details-container__main__info">
          <h1>User Details:</h1>
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
                {getAge(user.dateOfBirth)}
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
        </div>
      </div>
      <h1>Attended courses:</h1>
      <ul className="user-details-container__courses">
        {userCourses.map((course) => (
          <li
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
