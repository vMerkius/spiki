import { IModule } from "../../interfaces/IModule";

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
  return (
    <>
      {modules.map((module, index) => (
        <div
          onClick={() => {
            setModuleChosen(module.id);
            setLessonChosen(-1);
            setFlashcardChosen(-1);
            setShowQuiz(false);
          }}
          key={module.id}
          className="course-page__modules__tile"
          title={module.description}
        >
          <h2>{module.name}</h2>
          {progress > index && <h3>Completed</h3>}
        </div>
      ))}
    </>
  );
};
export default ModuleSidebar;
