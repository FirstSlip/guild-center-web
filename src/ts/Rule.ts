import type { ShortUser } from './ShortUser';

export type Rule = {
  title: string;
  description: string;
  user: ShortUser;
  updatedAt: string;
};
