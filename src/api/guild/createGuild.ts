import { request } from '@/common/func/request';
import type { Game } from '@/ts/Game';

type GuildCreateBody = {
  name: string;
  avatar: string;
  games: Game[];
  trends: string[];
  privacy: boolean;
  age: { min: number; max: number };
};

export const createGuild = async (body: GuildCreateBody) => {
  const response = await request<{ guildId: string }>(
    `guilds/create`,
    {
      method: 'POST',
      body: JSON.stringify(body),
      ignoreResponseError: true
    }
  );
  return response;
};
