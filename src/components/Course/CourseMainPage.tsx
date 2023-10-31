import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCourseAllModulesAPI } from "../../server/server";
import { IModule } from "../../interfaces/IModule";
import "./course-main-page.scss";

const CourseMainPage = () => {
  const value = useParams();
  const id = Number(value.courseId);
  const [modules, setModules] = useState<IModule[]>([]);

  useEffect(() => {
    const fetchModules = async () => {
      const modules = await getCourseAllModulesAPI(id);
      setModules(modules);
    };
    fetchModules();
  }, [id]);

  return (
    <>
      <div>
        {modules.map((module) => (
          <div key={module.id}>{module.id}</div>
        ))}
      </div>
      <h1>cxnhjkcbzx</h1>
    </>
  );
};

export default CourseMainPage;
