export type Guild = {
  id: number;
  name: string;
  avatarUrl?: string;
  bannerUrl?: string;
  games: string[];
  types: string[];
  genres?: string[];
  membersCount: number;
  description?: string;
};
