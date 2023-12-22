import React, { useState } from "react";
import { IFlashcard } from "../../../interfaces/IFlashcard";
import "./carousel.scss";
import { ILesson } from "../../../interfaces/ILesson";
import ArrowLeftIcon from "../../../assets/arrow-left-icon.svg";
import ArrowRightIcon from "../../../assets/arrow-right-icon.svg";

interface CarouselProps {
  items: Array<IFlashcard> | Array<ILesson>;
  isLesson: boolean;
  setLessonChosen?: React.Dispatch<React.SetStateAction<number>>;
  setFlashcardChosen?: React.Dispatch<React.SetStateAction<number>>;
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  isLesson,
  setLessonChosen,
  setFlashcardChosen,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length - 3) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };
  const handleClick = (id: number) => {
    if (isLesson) {
      setLessonChosen!(id);
    } else {
      setFlashcardChosen!(id);
    }
  };

  const renderItems = () => {
    const startIndex = currentIndex * 3;
    const endIndex = startIndex + 3;
    const currentItems = items.slice(startIndex, endIndex);

    return currentItems.map((item, index) => (
      <div
        key={index}
        className="carousel-item"
        onClick={() => {
          handleClick(item.id);
        }}
      >
        {item.name}
      </div>
    ));
  };

  return (
    <div className="carousel-container">
      <button
        onClick={handlePrev}
        className="arrow-btn arrow-btn--left"
        disabled={currentIndex <= 0}
      >
        <img src={ArrowLeftIcon} alt="arrow left icon" width="30px" />
      </button>
      <div className="carousel-item-container">{renderItems()}</div>
      <button
        onClick={handleNext}
        className="arrow-btn arrow-btn--right"
        disabled={currentIndex >= items.length - 3}
      >
        <img src={ArrowRightIcon} alt="arrow right icon" width="30px" />
      </button>
    </div>
  );
};

export default Carousel;
