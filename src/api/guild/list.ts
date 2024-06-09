import { request } from '@/common/func/request';
import type { Guild } from '@/ts/Guild';

export const list = async (page: number) => {
  const response = await request<{ guilds: Guild[] }>(`guilds`, {
    method: 'POST',
    body: JSON.stringify({ page }),
    ignoreResponseError: true
  });
  return response;
};
