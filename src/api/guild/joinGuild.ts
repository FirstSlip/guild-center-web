import { request } from '@/common/func/request';

export const joinGuild = async (guildId: string) => {
  const response = await request(`guilds/${guildId}/join`, {
    method: 'POST',
    ignoreResponseError: true
  });
  return response;
};
