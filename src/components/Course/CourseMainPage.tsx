import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCourseAllModulesAPI } from "../../server/server";
import { IModule } from "../../interfaces/IModule";
import "./course-main-page.scss";
import ModuleDetails from "./ModuleDetails";
import ModuleSidebar from "./ModuleSidebar";

const CourseMainPage = () => {
  const value = useParams();
  const id = Number(value.courseId);
  const [modules, setModules] = useState<IModule[]>([]);
  const [moduleChosen, setModuleChosen] = useState<number>(-1);
  const [flashcardChosen, setFlashcardChosen] = useState<number>(-1);
  const [lessonChosen, setLessonChosen] = useState<number>(-1);

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
        <ModuleSidebar
          modules={modules}
          setModuleChosen={setModuleChosen}
          setFlashcardChosen={setFlashcardChosen}
          setLessonChosen={setLessonChosen}
        />
      </div>
      <div className="course-page__details">
        {moduleChosen === -1 ? (
          <h1>Choose a module</h1>
        ) : (
          <ModuleDetails
            lessonChosen={lessonChosen}
            flashcardChosen={flashcardChosen}
            setFlashcardChosen={setFlashcardChosen}
            setLessonChosen={setLessonChosen}
            moduleId={moduleChosen}
          ></ModuleDetails>
        )}
      </div>
    </div>
  );
};

export default CourseMainPage;
