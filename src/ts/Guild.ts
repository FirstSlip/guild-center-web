import type { Game } from '@/ts/Game';

export type Guild = {
  guildId: string;
  name: string;
  avatar: string;
  banner: string;
  membersLength: number;
  games: Game[];
  trends: string[];
  description: string;
};
