import { request } from '@/common/func/request';
import type { Guild } from '@/ts/Guild';

export const getAll = async () => {
  const response = await request<{ guilds: Guild[] }>(`guilds`, {
    ignoreResponseError: true
  });
  return response;
};
