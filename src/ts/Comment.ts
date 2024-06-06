import type { ShortUser } from './shortUser';

export type Comment = {
  commentId: string;
  createdAt: string;
  text: string;
  receiverTag: string;
  sender: ShortUser;
};
