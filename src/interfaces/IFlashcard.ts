export interface IFlashcard {
  id: number;
  name: string;
  moduleId: number;
}
export type IFlashcardCreation = Omit<IFlashcard, "id">;
