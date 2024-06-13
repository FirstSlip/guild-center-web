import { request } from '@/common/func/request';
import type { Guild } from '@/ts/Guild';

export const my = async () => {
  const response = await request<{ guilds: Guild[] }>(
    `guilds/me`,
    {
      ignoreResponseError: true
    }
  );
  return response;
};
