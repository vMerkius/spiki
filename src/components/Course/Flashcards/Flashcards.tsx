import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IFlashcard } from "../../../interfaces/IFlashcard";
import { getFlashcardAPI, getFlashcardWordsAPI } from "../../../server/server";
import { IWord } from "../../../interfaces/IWord";
import ArrowLeftIcon from "../../../../public/icons/arrow-left-icon.svg";
import ArrowRightIcon from "../../../../public/icons/arrow-right-icon.svg";
import "./flashcards.scss";

const Flashcards = () => {
  const value = useParams();
  const flashcardId = Number(value.flashcardId);
  const [flashcard, setFlashcard] = useState<IFlashcard>();
  const [words, setWords] = useState<IWord[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [showBack, setShowBack] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedFlashcard = await getFlashcardAPI(flashcardId);
      const fetchedWords = await getFlashcardWordsAPI(flashcardId);
      setWords(fetchedWords);
      setFlashcard(fetchedFlashcard);
    };
    fetchData();
  }, [flashcardId]);

  const handleCardClick = () => {
    setShowBack(!showBack);
    setIsFlipped(!isFlipped);
  };
  const handlePrevClick = () => {
    setCurrent(current - 1);
    setIsFlipped(false);
  };
  const handleNextClick = () => {
    setCurrent(current + 1);
    setIsFlipped(false);
  };

  return (
    <div>
      <h1>{flashcard?.name}</h1>
      <p>
        Current: {current + 1} / {words.length}
      </p>

      <div className="flashcard">
        <button
          className="arrow-btn arrow-btn--left"
          onClick={handlePrevClick}
          disabled={current === 0}
        >
          <img src={ArrowLeftIcon} alt="arrow left icon" width="30px" />
        </button>
        {words.length > 0 && (
          <div
            onClick={handleCardClick}
            className={`flashcard__card ${
              isFlipped ? "flashcard__card--flipped" : ""
            }`}
          >
            {showBack ? (
              <div>
                <h2>{words[current].originalWord}</h2>
              </div>
            ) : words[current].imageUrl === "" ? (
              <div>
                <h2>{words[current].translatedWord}</h2>
              </div>
            ) : (
              <>
                <img
                  width="200px"
                  height="200px"
                  src={words[current].imageUrl}
                  alt="img"
                />
              </>
            )}
          </div>
        )}
        <button
          className="arrow-btn arrow-btn--right"
          onClick={handleNextClick}
          disabled={current === words.length - 1}
        >
          <img src={ArrowRightIcon} alt="arrow right icon" width="30px" />
        </button>
      </div>
    </div>
  );
};

export default Flashcards;
