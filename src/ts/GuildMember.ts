import type { ShortUser } from '@/ts/ShortUser';
import type { Role } from '@/ts/Role';

export type GuildMember = {
  user: ShortUser;
  role: Role;
};
