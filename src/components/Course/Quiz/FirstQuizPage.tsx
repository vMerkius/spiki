type FirstQuizPageProps = {
  name: string | undefined;
  description: string | undefined;
  setShowFirstPage: (value: boolean) => void;
};

const FirstQuizPage: React.FC<FirstQuizPageProps> = ({
  name,
  description,
  setShowFirstPage,
}) => {
  return (
    <div className="first-page-quiz">
      <h1>{name}</h1>
      <h2>{description}</h2>
      <button onClick={() => setShowFirstPage(false)}>Rozpocznij</button>
    </div>
  );
};
export default FirstQuizPage;
