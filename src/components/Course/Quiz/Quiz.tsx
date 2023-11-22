import { useEffect, useState } from "react";
import { IQuestion } from "../../../interfaces/IQuestion";
import {
  checkAnswerAPI,
  getModuleQuizAPI,
  getQuestionAnswersAPI,
  getQuizQuestionsAPI,
} from "../../../server/server";
import { IAnswer } from "../../../interfaces/IAnswer";
import "./quiz.scss";
import { IQuiz } from "../../../interfaces/IQuiz";

type QuizProps = {
  setShowQuiz: React.Dispatch<React.SetStateAction<boolean>>;
  moduleId: number;
};

const Quiz: React.FC<QuizProps> = ({ setShowQuiz, moduleId }) => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [quiz, setQuiz] = useState<IQuiz>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(
    null
  );
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [userChoice, setUserChoice] = useState<number>(0);
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);
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

  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setCurrentQuestion(questions[nextIndex]);
    }
  };

  const handlePreviousQuestion = () => {
    const prevIndex = currentQuestionIndex - 1;
    if (prevIndex >= 0) {
      setCurrentQuestionIndex(prevIndex);
      setCurrentQuestion(questions[prevIndex]);
    }
  };

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserChoice(Number(event.target.value));
    console.log(Number(event.target.value));
  };

  const handleCheck = async () => {
    if (!currentQuestion) return;
    const asnwerCheck = await checkAnswerAPI(currentQuestion.id, userChoice);
    if (asnwerCheck === 200) {
      setCorrectAnswer((prev) => prev + 1);
    }
  };

  return (
    <div className="quiz">
      <button className="back-btn" onClick={() => setShowQuiz((prev) => !prev)}>
        Powrót
      </button>
      <h1>{quiz?.name}</h1>
      <h2>{quiz?.description}</h2>
      <h2>
        {currentQuestionIndex + 1}/{questions.length}
      </h2>
      <h2>
        {correctAnswer}/{questions.length}
      </h2>
      {currentQuestion && (
        <div key={currentQuestion.id}>
          <h1>Pytanie:</h1>
          <h2>{currentQuestion.description}</h2>
          <form>
            {answers.map((answer, index) => (
              <div key={answer.id}>
                <label>
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
          <button onClick={handleCheck}>Odpowiedz</button>
          <button onClick={handlePreviousQuestion}>Poprzednie</button>
          <button onClick={handleNextQuestion}>Nastepne</button>
        </div>
      )}
    </div>
  );
};
export default Quiz;
