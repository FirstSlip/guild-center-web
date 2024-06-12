import { request } from '@/common/func/request';
import type { GuildMember } from '@/ts/GuildMember';

export const changeMembers = async (
  guildId: string,
  members: GuildMember[]
) => {
  const response = await request<{
    guildId: string;
    members: GuildMember[];
  }>(`guilds/${guildId}/members`, {
    method: 'POST',
    body: JSON.stringify({
      members: members
    }),
    ignoreResponseError: true
  });
  return response;
};
