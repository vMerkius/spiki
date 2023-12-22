import { useEffect, useState } from "react";
import { IQuestion } from "../../../interfaces/IQuestion";
import {
  checkAnswerAPI,
  getModuleQuizAPI,
  getQuestionAnswersAPI,
  getQuizQuestionsAPI,
  updateUserProgress,
} from "../../../server/server";
import { IAnswer } from "../../../interfaces/IAnswer";
import "./quiz.scss";
import { IQuiz } from "../../../interfaces/IQuiz";
import { useParams } from "react-router";
import FirstQuizPage from "./FirstQuizPage";
import LifeIcons from "../LifeIcons";
import ProgressBar from "../../shared/ProgressBar";

type QuizProps = {
  setShowQuiz: React.Dispatch<React.SetStateAction<boolean>>;
  moduleId: number;
  canQuiz: boolean;
};

const Quiz: React.FC<QuizProps> = ({ setShowQuiz, moduleId, canQuiz }) => {
  const value = useParams();
  const userId = Number(value.id);
  const courseId = Number(value.courseId);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [quiz, setQuiz] = useState<IQuiz>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(
    null
  );
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [userChoice, setUserChoice] = useState<number>(0);
  const [incorrectAnswer, setIncorrectAnswer] = useState<number>(3);
  const [showFirstPage, setShowFirstPage] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      const fetchedQuiz = await getModuleQuizAPI(moduleId);
      const fetchedQuestions = await getQuizQuestionsAPI(moduleId);
      setQuiz(fetchedQuiz);
      setQuestions(fetchedQuestions);
      if (fetchedQuestions.length > 0) {
        setCurrentQuestion(fetchedQuestions[0]);
      }
    };
    fetchData();
  }, [moduleId]);
  useEffect(() => {
    if (currentQuestion) {
      const fetchAnswers = async () => {
        const fetchedAnswers = await getQuestionAnswersAPI(currentQuestion.id);
        setAnswers(fetchedAnswers);
      };
      fetchAnswers();
    }
  }, [currentQuestion]);

  const handleNextQuestion = async () => {
    if (userChoice === 0) {
      alert("Wybierz odpowiedź");
      return;
    }
    if (!currentQuestion) return;
    const asnwerCheck = await checkAnswerAPI(currentQuestion.id, userChoice);
    if (asnwerCheck !== 200) {
      setIncorrectAnswer((prev) => prev - 1);
    }
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setCurrentQuestion(questions[nextIndex]);
    }
    setUserChoice(0);
  };

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserChoice(Number(event.target.value));
  };

  const handleEnd = async () => {
    if (userChoice === 0) {
      alert("Wybierz odpowiedź");
      return;
    }
    if (incorrectAnswer > 0) {
      if (canQuiz) {
        const res = await updateUserProgress(courseId, userId);
        console.log(res);
        alert("Gratulacje");
      } else {
        alert(
          "Gratulacje, wynik nie został zapisany, ponieważ już wcześniej ukończyłeś ten moduł"
        );
      }
      setShowQuiz((prev) => !prev);
    } else {
      alert("Nie udało się");
      setShowQuiz((prev) => !prev);
    }
  };

  return (
    <div className="quiz">
      {!showFirstPage && (
        <ProgressBar
          currentValue={currentQuestionIndex + 1}
          totalValue={questions.length}
        ></ProgressBar>
      )}

      <button className="back-btn" onClick={() => setShowQuiz((prev) => !prev)}>
        Powrót
      </button>

      {showFirstPage ? (
        <FirstQuizPage
          name={quiz?.name}
          description={quiz?.description}
          setShowFirstPage={setShowFirstPage}
        />
      ) : (
        <div className="quiz__question">
          <h1>Pytanie:</h1>
          <h2>
            {currentQuestionIndex + 1}/{questions.length}
          </h2>
          <LifeIcons totalLives={3} currentLives={incorrectAnswer} />

          {currentQuestion && (
            <div className="quiz__question__data" key={currentQuestion.id}>
              <h2>{currentQuestion.description}</h2>
              <form>
                {answers.map((answer, index) => (
                  <div key={answer.id}>
                    <label className="quiz__question__data__answer">
                      <input
                        type="radio"
                        value={index + 1}
                        onChange={handleAnswerChange}
                        checked={userChoice === index + 1}
                      />
                      <span className="answer">{answer.name}</span>
                    </label>
                  </div>
                ))}
              </form>
              {currentQuestionIndex !== questions.length - 1 ? (
                <button className="next-btn" onClick={handleNextQuestion}>
                  Nastepne
                </button>
              ) : (
                <button className="end-btn" onClick={handleEnd}>
                  end
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Quiz;
