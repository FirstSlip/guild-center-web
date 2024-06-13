import type { Game } from '@/ts/Game';
import type { GuildMember } from '@/ts/GuildMember';
import type { Task } from './Task';
import type { Chat } from './Chat';
import type { Rule } from './Rule';

export type Guild = {
  guildId: string;
  name: string;
  avatar: string;
  banner: string;
  members: GuildMember[];
  membersLength: number;
  games: Game[];
  trends: string[];
  description: string;
  tasks: Task[];
  chats: Chat[];
  rules: Rule[] | null;
};
