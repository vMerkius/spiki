import "./life-icons.scss";

type LifeIconProps = {
  isActive: boolean;
};

const LifeIcon: React.FC<LifeIconProps> = ({ isActive }) => {
  return (
    <div className="lifes-container__single">
      {isActive ? <h1>jest</h1> : <h1>nie ma</h1>}
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
