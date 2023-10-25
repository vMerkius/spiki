export interface IReport {
  id: number;
  email: string;
  topic: string;
  message: string;
  isReviewed: boolean;
}

export type IReportCreation = Omit<IReport, "id">;
