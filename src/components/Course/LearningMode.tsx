import { useEffect, useState } from "react";
import SpeechRecognition from "./SpeechRecognition";
import { useParams } from "react-router";
import { getLearningAPI, getQuestionAnswersAPI } from "../../server/server";
import LearningFlashcard from "./Learning/LearningFlashcard";
import LearningSentence from "./Learning/LearningSentence";
import { IAnswer } from "../../interfaces/IAnswer";
import LearningQuestion from "./Learning/LearningQuestion";
import LifeIcons from "./LifeIcons";

type LearningModeProps = {
  setShowLearningMode: React.Dispatch<React.SetStateAction<boolean>>;
  moduleId: number;
};

const LearningMode: React.FC<LearningModeProps> = ({
  moduleId,
  setShowLearningMode,
}) => {
  const [learningData, setLearningData] = useState<any>([]);
  const [allMaterialsQuantity, setAllMaterialsQuantity] = useState<number>(0);
  const [currentMaterial, setCurrentMaterial] = useState<number>(0);

  const [currentFlashcard, setCurrentFlashcard] = useState<number>(0);
  const [userValue, setUserValue] = useState<string>("");

  const [lifeState, setLifeState] = useState<number>(3);

  const [currentSentence, setCurrentSentence] = useState<number>(0);
  const [userSentence, setUserSentence] = useState<string[]>([]);

  const [currentQuizQuestion, setCurrentQuizQuestion] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<number>(0);
  const [answers, setAnswers] = useState<IAnswer[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getLearningAPI(moduleId);

      setLearningData(fetchedData);
      const quantity =
        fetchedData.flashcards.length +
        fetchedData.quizQuestions.length +
        fetchedData.sentences.length;
      setAllMaterialsQuantity(quantity);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchAnswers = async () => {
      if (!learningData.quizQuestions) return;
      const fetchedAnswers = await getQuestionAnswersAPI(
        learningData.quizQuestions[currentQuizQuestion].id
      );
      setAnswers(fetchedAnswers);
    };
    fetchAnswers();
  }, [currentQuizQuestion, learningData]);
  useEffect(() => {
    if (lifeState === 0) {
      alert("koniec");
    }
  }, [lifeState]);

  const handleNext = () => {
    if (currentMaterial === allMaterialsQuantity - 1) {
      alert("koniec");
      return;
    } else {
      setCurrentMaterial((prev) => prev + 1);
      switch (currentMaterial % 3) {
        case 0:
          if (
            userValue.toLowerCase() ===
            learningData.flashcards[currentFlashcard].originalWord.toLowerCase()
          ) {
            console.log("ok");
          } else {
            setLifeState((prev) => prev - 1);
            console.log("nie ok");
          }
          setUserValue("");
          setCurrentFlashcard((prev) => prev + 1);
          break;

        case 1:
          console.log(userAnswer, learningData.quizQuestions[0].correctAnswer);
          if (userAnswer === learningData.quizQuestions[0].correctAnswer) {
            console.log("ok");
          } else {
            setLifeState((prev) => prev - 1);
            console.log("nie ok");
          }
          setUserAnswer(0);
          setCurrentQuizQuestion((prev) => prev + 1);
          break;
        case 2:
          if (
            userSentence.join(" ") ===
            learningData.sentences[currentSentence].translated
          ) {
            console.log("ok");
          } else {
            setLifeState((prev) => prev - 1);
            console.log("nie ok");
          }
          setCurrentSentence((prev) => prev + 1);
          setUserSentence([]);
          break;
      }
    }
  };

  return (
    <div className="learning-mode">
      <button
        className="back-btn"
        onClick={() => setShowLearningMode((prev) => !prev)}
      >
        Powrót
      </button>
      <h2>
        {currentMaterial + 1}/{allMaterialsQuantity}
      </h2>
      <LifeIcons totalLives={3} currentLives={lifeState} />
      {currentMaterial % 3 === 0 &&
        learningData.flashcards &&
        learningData.flashcards.length > currentFlashcard && (
          <LearningFlashcard
            word={learningData.flashcards[currentFlashcard]}
            userValue={userValue}
            setUserValue={setUserValue}
          />
        )}
      {currentMaterial % 3 === 1 &&
        learningData.quizQuestions &&
        learningData.quizQuestions.length > 0 && (
          <LearningQuestion
            question={learningData.quizQuestions[currentQuizQuestion]}
            answers={answers}
            userAnswer={userAnswer}
            setUserAnswer={setUserAnswer}
          />
        )}
      {currentMaterial % 3 === 2 &&
        learningData.sentences &&
        learningData.sentences.length > currentSentence && (
          <LearningSentence
            sentence={learningData.sentences[currentSentence]}
            userSentence={userSentence}
            setUserSentence={setUserSentence}
          />
        )}
      <button
        className="next-btn"
        onClick={handleNext}
        style={{ position: "absolute", left: "0", bottom: "0" }}
      >
        Następne
      </button>
    </div>
  );
};
export default LearningMode;
