import { request } from '@/common/func/request';
import type { GuildMember } from '@/ts/GuildMember';

export const members = async (
  guildId: string,
  members: GuildMember[]
) => {
  const response = await request<null>(
    `guilds/${guildId}/members`,
    {
      method: 'POST',
      body: JSON.stringify({ members }),
      ignoreResponseError: true
    }
  );
  return response;
};
