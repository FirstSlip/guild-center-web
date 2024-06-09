import { request } from '@/common/func/request';
import type { Guild } from '@/ts/Guild';

export const getById = async (guildId: string) => {
  const response = await request<{ guild: Guild }>(
    `guilds/${guildId}`,
    {
      ignoreResponseError: true
    }
  );
  return response;
};
