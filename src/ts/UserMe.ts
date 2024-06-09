import type { FriendRequest } from '@/ts/FriendRequest';
import type { User } from '@/ts/User';

export type UserMe = User & {
  username: string;
  email: string;
  chats: [];
  friendRequests: FriendRequest[];
  guildRequests: [];
  blockedUsers: [];
  privacy: {
    comments: boolean;
    guilds: boolean;
    tasks: boolean;
    friends: boolean;
  };
};
