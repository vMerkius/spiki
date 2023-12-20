import "./life-icons.scss";
import life from "../../assets/heart-1.png";

type LifeIconProps = {
  isActive: boolean;
};

const LifeIcon: React.FC<LifeIconProps> = ({ isActive }) => {
  return (
    <div className="lifes-container__single">
      {isActive ? (
        <img
          className="lifes-container__single__img"
          src={life}
          alt="life"
          width="50px"
        />
      ) : (
        <></>
      )}
    </div>
  );
};

type LifeIconsProps = {
  totalLives: number;
  currentLives: number;
};

const LifeIcons: React.FC<LifeIconsProps> = ({ totalLives, currentLives }) => {
  const icons = [];
  for (let i = 0; i < totalLives; i++) {
    icons.push(<LifeIcon key={i} isActive={i < currentLives} />);
  }
  return <div className="lifes-container">{icons}</div>;
};

export default LifeIcons;
