import type { User } from './User';

export type UserMe = User & {
  username: string;
  email: string;
  chats: [];
  friendRequests: [];
  guildRequests: [];
  blockedUsers: [];
  privacy: {
    comments: boolean;
    guilds: boolean;
    tasks: boolean;
    friends: boolean;
  };
};
