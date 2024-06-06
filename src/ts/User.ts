import type { Comment } from './Comment';

export type User = {
  username: string;
  avatar: string;
  banner: string;
  description: string;
  tag: string;
  comments: Comment[];
  guilds: [];
  friends: [];
  gameAccounts: [];
  games: [];
  tasks: [];
  createdAt: string;
  online: 'offline' | 'online';
};
