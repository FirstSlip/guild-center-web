import type { ShortUser } from './ShortUser';

export type Comment = {
  commentId: string;
  createdAt: string;
  text: string;
  receiverTag: string;
  sender: ShortUser;
};
