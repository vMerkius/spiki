export interface ISentence {
  id: number;
  original: string;
  translated: string;
  moduleId: number;
}

export type ISentenceCreation = Omit<ISentence, "id">;
