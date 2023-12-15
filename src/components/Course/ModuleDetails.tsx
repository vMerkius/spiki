import { useEffect, useState } from "react";
import { IFlashcard } from "../../interfaces/IFlashcard";
import {
  getFlashcardsFromModuleAPI,
  getLessonsFromModuleAPI,
  getModuleAPI,
} from "../../server/server";
import { IModule } from "../../interfaces/IModule";
import Flashcards from "./Flashcards/Flashcards";
import Lessons from "./Lessons/Lessons";
import Quiz from "./Quiz/Quiz";
import LearningMode from "./LearningMode";

type ModuleDetailsProps = {
  moduleId: number;
  flashcardChosen: number;
  setFlashcardChosen: React.Dispatch<React.SetStateAction<number>>;
  lessonChosen: number;
  setLessonChosen: React.Dispatch<React.SetStateAction<number>>;
  showQuiz: boolean;
  setShowQuiz: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLearningMode: React.Dispatch<React.SetStateAction<boolean>>;
  showLearningMode: boolean;
};

const ModuleDetails: React.FC<ModuleDetailsProps> = ({
  moduleId,
  flashcardChosen,
  setFlashcardChosen,
  lessonChosen,
  setLessonChosen,
  showQuiz,
  setShowQuiz,
  setShowLearningMode,
  showLearningMode,
}) => {
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
      {showQuiz ? (
        <Quiz setShowQuiz={setShowQuiz} moduleId={moduleId} />
      ) : showLearningMode ? (
        <LearningMode
          setShowLearningMode={setShowLearningMode}
          moduleId={moduleId}
        ></LearningMode>
      ) : (
        <>
          <button
            onClick={() => {
              setShowLearningMode(true);
            }}
          >
            learning mode
          </button>
          <button
            onClick={() => {
              setShowQuiz(true);
            }}
          >
            Zakończ moduł i wypełnij quiz
          </button>
          {flashcardChosen === -1 && lessonChosen === -1 && (
            <div className="module-details">
              <h1>Module Details</h1>
              <h2>{module?.description}</h2>
              <div className="module-details__choice">
                <div className="module-details__choice__flashcards">
                  <h2>Flashcards</h2>
                  {flashcards.map((flashcard) => (
                    <div
                      key={flashcard.id}
                      onClick={() => setFlashcardChosen(flashcard.id)}
                    >
                      <h3>{flashcard.name}</h3>
                    </div>
                  ))}
                </div>
                <div className="module-details__choice__lessons">
                  <h2>Lessons</h2>
                  {lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      onClick={() => setLessonChosen(lesson.id)}
                    >
                      <h3>{lesson.name}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {flashcardChosen !== -1 && (
            <Flashcards flashcardId={flashcardChosen}></Flashcards>
          )}
          {lessonChosen !== -1 && (
            <Lessons lessonChosen={lessonChosen}></Lessons>
          )}
        </>
      )}
    </div>
  );
};
export default ModuleDetails;
