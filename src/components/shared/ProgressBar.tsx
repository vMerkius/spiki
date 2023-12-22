import React from "react";
import "./progressBar.scss";

interface ProgressBarProps {
  currentValue: number;
  totalValue: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentValue,
  totalValue,
}) => {
  const progressRatio = (currentValue / totalValue) * 100;

  return (
    <div className="progress-bar">
      <div
        className="progress-bar__item"
        style={{
          width: `${progressRatio}%`,
          backgroundColor: `rgb(122, 247, 118)`,
        }}
      >
        {" "}
        <div className="progress-bar__item__value">{`${currentValue}/${totalValue}`}</div>
      </div>
    </div>
  );
};

export default ProgressBar;
