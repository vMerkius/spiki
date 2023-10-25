export interface IReply {
  id: number;
  message: string;
  reportId: number;
}

export type IReplyCreation = Omit<IReply, "id">;
