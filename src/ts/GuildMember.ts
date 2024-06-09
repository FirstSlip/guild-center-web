import type { ShortUser } from '@/ts/shortUser';
import type { Role } from '@/ts/Role';

export type GuildMember = ShortUser & {
  role: Role;
};
