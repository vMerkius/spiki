export interface IQuestion {
  id: number;
  description: string;
  correctAnswer: number;
  quizId: number;
}
export type IQuestionCreation = Omit<IQuestion, "id">;
