import { request } from '@/common/func/request';

export const setPrivacy = async (
  guildId: string,
  privacy: boolean
) => {
  const response = await request<null>(
    `guilds/${guildId}/privacy`,
    {
      method: 'POST',
      body: JSON.stringify({ privacy }),
      ignoreResponseError: true
    }
  );
  return response;
};
