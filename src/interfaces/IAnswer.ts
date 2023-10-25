export interface IAnswer {
  id: number;
  name: string;
  questionId: number;
}
export type IAnswerCreation = Omit<IAnswer, "id">;
