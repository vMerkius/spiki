import { IModule } from "../../interfaces/IModule";

type ModuleSidebarProps = {
  modules: IModule[];
  setModuleChosen: React.Dispatch<React.SetStateAction<number>>;
  setLessonChosen: React.Dispatch<React.SetStateAction<number>>;
  setFlashcardChosen: React.Dispatch<React.SetStateAction<number>>;
};

const ModuleSidebar: React.FC<ModuleSidebarProps> = ({
  modules,
  setModuleChosen,
  setLessonChosen,
  setFlashcardChosen,
}) => {
  return (
    <>
      {modules.map((module) => (
        <div
          onClick={() => {
            setModuleChosen(module.id);
            setLessonChosen(-1);
            setFlashcardChosen(-1);
          }}
          key={module.id}
          className="course-page__modules__tile"
          title={module.description}
        >
          <h2>{module.name}</h2>
        </div>
      ))}
    </>
  );
};
export default ModuleSidebar;
