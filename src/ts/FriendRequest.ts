import type { ShortUser } from '@/ts/shortUser';

export type FriendRequest = {
  code: string;
  recipient: ShortUser;
  sender: ShortUser;
};
