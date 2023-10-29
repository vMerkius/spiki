import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCourseAllModulesAPI } from "../../server/server";
import { IModule } from "../../interfaces/IModule";

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
      {modules.map((module) => (
        <div key={module.id}>
          <p>{module.description}</p>
        </div>
      ))}
      <h1>cxnhjkcbzx</h1>
    </>
  );
};
export default CourseMainPage;
