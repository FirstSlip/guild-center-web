import type { Comment } from '@/ts/Comment';
import type { Guild } from '@/ts/Guild';
import type { ShortUser } from './ShortUser';

export type User = {
  username: string;
  avatar: string;
  banner: string;
  description: string;
  tag: string;
  comments: Comment[];
  guilds: Guild[];
  friends: ShortUser[];
  gameAccounts: [];
  games: [];
  tasks: [];
  createdAt: string;
  online: 'offline' | 'online';
};
