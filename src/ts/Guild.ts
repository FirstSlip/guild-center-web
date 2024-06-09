import type { Game } from '@/ts/Game';
import type { GuildMember } from '@/ts/GuildMember';

export type Guild = {
  guildId: string;
  name: string;
  avatar: string;
  banner: string;
  members: GuildMember[];
  games: Game[];
  trends: string[];
  description: string;
};
