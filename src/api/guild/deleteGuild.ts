import { request } from '@/common/func/request';

export const deleteGuild = async (guildId: number) => {
  const response = await request<null>(`guilds/${guildId}`, {
    method: 'DELETE',
    ignoreResponseError: true
  });
  return response;
};
