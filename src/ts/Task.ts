import type { GuildMember } from './GuildMember';
import type { Mission } from './Mission';

export type Task = {
  name: string;
  description: string;
  reward: string;
  members: GuildMember[];
  startedAt: string | null;
  endedAt: string | null;
  missions: Mission[];
  taskId: string;
};
