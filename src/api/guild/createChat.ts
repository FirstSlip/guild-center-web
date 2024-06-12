import { request } from '@/common/func/request';
import type { GuildMember } from '@/ts/GuildMember';

export const createChat = async (
  guildId: string,
  name: string,
  members: GuildMember[]
) => {
  const response = await request<{ taskId: string }>(
    `guilds/${guildId}/createChat`,
    {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        members: members
      }),
      ignoreResponseError: true
    }
  );
  return response;
};
