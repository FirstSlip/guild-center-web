export type User = {
  shownUsername: string;
  avatar: string;
  banner: string;
  description: string;
  tag: string;
  comments: [];
  guilds: [];
  friends: [];
  gameAccounts: [];
  games: [];
  tasks: [];
  createdAt: string;
  online: 'offline' | 'online';
};
