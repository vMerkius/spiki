import { useEffect, useState } from "react";
import { IFlashcard } from "../../interfaces/IFlashcard";
import {
  getFlashcardsFromModuleAPI,
  getLessonsFromModuleAPI,
  getModuleAPI,
} from "../../server/server";
import { IModule } from "../../interfaces/IModule";
import { useNavigate } from "react-router";

type ModuleDetailsProps = {
  moduleId: number;
};

const ModuleDetails: React.FC<ModuleDetailsProps> = ({ moduleId }) => {
  const navigate = useNavigate();
  const [module, setModule] = useState<IModule>();
  const [flashcards, setFlashcards] = useState<IFlashcard[]>([]);
  const [lessons, setLessons] = useState<IFlashcard[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const fetchedModule = await getModuleAPI(moduleId);
      const fetchedFlashcards = await getFlashcardsFromModuleAPI(moduleId);
      const fetchedLessons = await getLessonsFromModuleAPI(moduleId);
      setModule(fetchedModule);
      setFlashcards(fetchedFlashcards);
      setLessons(fetchedLessons);
    };
    fetchData();
  }, [moduleId]);
  return (
    <div className="module-details">
      <h1>Module Details</h1>
      <h2>{module?.description}</h2>
      <div className="module-details__choice">
        <div className="module-details__choice__flashcards">
          <h2>Flashcards</h2>
          {flashcards.map((flashcard) => (
            <div
              key={flashcard.id}
              onClick={() =>
                navigate(
                  `/user-courses/1/1/${moduleId}/flashcards/${flashcard.id}`
                )
              }
            >
              <h3>{flashcard.name}</h3>
            </div>
          ))}
        </div>
        <div className="module-details__choice__lessons">
          <h2>Lessons</h2>
          {lessons.map((lesson) => (
            <div key={lesson.id}>
              <h3>{lesson.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ModuleDetails;
