import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCourseAllModulesAPI } from "../../server/server";
import { IModule } from "../../interfaces/IModule";
import "./course-main-page.scss";
import ModuleDetails from "./ModuleDetails";

const CourseMainPage = () => {
  const value = useParams();
  const id = Number(value.courseId);
  const [modules, setModules] = useState<IModule[]>([]);
  const [moduleChosen, setModuleChosen] = useState<number>(-1);

  useEffect(() => {
    const fetchModules = async () => {
      const fetchedModules = await getCourseAllModulesAPI(id);
      setModules(fetchedModules);
    };
    fetchModules();
  }, [id]);

  return (
    <div className="course-page">
      <div className="course-page__modules">
        {!modules && <h2>No modules</h2>}

        {modules.map((module) => (
          <div
            onClick={() => setModuleChosen(module.id)}
            key={module.id}
            className="course-page__modules__tile"
            title={module.description}
          >
            <h2>{module.name}</h2>
          </div>
        ))}
      </div>
      <div className="course-page__details">
        {moduleChosen === -1 ? (
          <h1>Choose a module</h1>
        ) : (
          <ModuleDetails moduleId={moduleChosen}></ModuleDetails>
        )}
      </div>
    </div>
  );
};

export default CourseMainPage;
