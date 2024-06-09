import type { ShortUser } from '@/ts/ShortUser';

export type FriendRequest = {
  code: string;
  recipient: ShortUser;
  sender: ShortUser;
};
