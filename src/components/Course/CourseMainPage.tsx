import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  getCourseAllModulesAPI,
  getUserProgressAPI,
} from "../../server/server";
import { IModule } from "../../interfaces/IModule";
import "./course-main-page.scss";
import ModuleDetails from "./ModuleDetails";
import ModuleSidebar from "./ModuleSidebar";

const CourseMainPage = () => {
  const value = useParams();
  const userId = Number(value.id);
  const courseId = Number(value.courseId);
  const [modules, setModules] = useState<IModule[]>([]);
  const [moduleChosen, setModuleChosen] = useState<number>(-1);
  const [flashcardChosen, setFlashcardChosen] = useState<number>(-1);
  const [lessonChosen, setLessonChosen] = useState<number>(-1);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [showLearingMode, setShowLearningMode] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const fetchModules = async () => {
      const fetchProgress = await getUserProgressAPI(courseId, userId);
      const fetchedModules = await getCourseAllModulesAPI(courseId);
      setModules(fetchedModules);
      setProgress(fetchProgress);
    };
    fetchModules();
  }, [courseId]);

  return (
    <div className="course-page">
      <div className="course-page__modules">
        {!modules && <h2>No modules</h2>}
        <ModuleSidebar
          progress={progress}
          modules={modules}
          setModuleChosen={setModuleChosen}
          setFlashcardChosen={setFlashcardChosen}
          setLessonChosen={setLessonChosen}
          setShowQuiz={setShowQuiz}
        />
      </div>
      <div className="course-page__details">
        {moduleChosen === -1 ? (
          <h1>Wybierz moduł</h1>
        ) : (
          <ModuleDetails
            lessonChosen={lessonChosen}
            flashcardChosen={flashcardChosen}
            setFlashcardChosen={setFlashcardChosen}
            setLessonChosen={setLessonChosen}
            moduleId={moduleChosen}
            showQuiz={showQuiz}
            setShowQuiz={setShowQuiz}
            setShowLearningMode={setShowLearningMode}
            showLearningMode={showLearingMode}
          ></ModuleDetails>
        )}
      </div>
    </div>
  );
};

export default CourseMainPage;
