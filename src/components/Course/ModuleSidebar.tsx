import { IModule } from "../../interfaces/IModule";
import stargood from "../../assets/star-good.png";
import starbad from "../../assets/star-bad.png";

type ModuleSidebarProps = {
  progress: number;
  modules: IModule[];
  setModuleChosen: React.Dispatch<React.SetStateAction<number>>;
  setLessonChosen: React.Dispatch<React.SetStateAction<number>>;
  setFlashcardChosen: React.Dispatch<React.SetStateAction<number>>;
  setShowQuiz: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModuleSidebar: React.FC<ModuleSidebarProps> = ({
  progress,
  modules,
  setModuleChosen,
  setLessonChosen,
  setFlashcardChosen,
  setShowQuiz,
}) => {
  console.log(progress);

  return (
    <div className="course-page__modules__tiles">
      {modules.map((module, index) => (
        <div
          onClick={() => {
            setModuleChosen(module.id);
            setLessonChosen(-1);
            setFlashcardChosen(-1);
            setShowQuiz(false);
          }}
          key={module.id}
          className="course-page__modules__tiles__tile"
          title={module.description}
        >
          <h2>{module.name}</h2>
          {progress > index ? (
            <img
              className="course-page__modules__tiles__tile__img"
              src={stargood}
              alt="star"
              width="50px"
            />
          ) : (
            <img
              className="course-page__modules__tiles__tile__img"
              src={starbad}
              alt="star"
              width="50px"
            />
          )}
        </div>
      ))}
    </div>
  );
};
export default ModuleSidebar;
