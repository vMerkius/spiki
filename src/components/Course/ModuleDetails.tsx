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
import Carousel from "./Carousel/Carousel";

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
    <div className="module-details-container">
      {showQuiz ? (
        <Quiz setShowQuiz={setShowQuiz} moduleId={moduleId} />
      ) : showLearningMode ? (
        <LearningMode
          setShowLearningMode={setShowLearningMode}
          moduleId={moduleId}
        ></LearningMode>
      ) : (
        <>
          {flashcardChosen === -1 && lessonChosen === -1 && (
            <div className="module-details">
              <div className="module-details__left">
                <div className="module-details__left__choice">
                  <div className="module-details__left__choice__lessons">
                    <h2>Lekcje</h2>
                    <Carousel
                      items={lessons}
                      isLesson={true}
                      setFlashcardChosen={setFlashcardChosen}
                      setLessonChosen={setLessonChosen}
                    />
                    {/* {lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      onClick={() => setLessonChosen(lesson.id)}
                    >
                      <h3>{lesson.name}</h3>
                    </div>
                  ))} */}
                  </div>
                  <div className="module-details__left__choice__flashcards">
                    <h2>Fiszki</h2>
                    <Carousel
                      items={flashcards}
                      isLesson={false}
                      setFlashcardChosen={setFlashcardChosen}
                      setLessonChosen={setLessonChosen}
                    />
                    {/* {flashcards.map((flashcard) => (
                    <div
                      key={flashcard.id}
                      onClick={() => setFlashcardChosen(flashcard.id)}
                    >
                      <h3>{flashcard.name}</h3>
                    </div>
                  ))} */}
                  </div>
                </div>
              </div>

              <div className="module-details__right">
                <h1>Szczegóły modułu</h1>
                <h2>{module?.description}</h2>
              </div>
            </div>
          )}
          {flashcardChosen === -1 && lessonChosen === -1 && (
            <div className="module-details__buttons">
              <button
                className="module-details__buttons__learning-btn"
                onClick={() => {
                  setShowLearningMode(true);
                }}
              >
                Tryb nauki
              </button>
              <button
                className="module-details__buttons__quiz-btn"
                onClick={() => {
                  setShowQuiz(true);
                }}
              >
                Zakończ moduł i wypełnij quiz
              </button>
            </div>
          )}
          {flashcardChosen !== -1 && (
            <Flashcards flashcardId={flashcardChosen}></Flashcards>
          )}
          {lessonChosen !== -1 && (
            <Lessons
              lessonChosen={lessonChosen}
              setLessonChosen={setLessonChosen}
            ></Lessons>
          )}
        </>
      )}
    </div>
  );
};
export default ModuleDetails;
