import { request } from '@/common/func/request';
import type { Rule } from '@/ts/Rule';

export const addRule = async (
  guildId: string,
  title: string,
  description: string
) => {
  const response = await request<{ rule: Rule }>(
    `guilds/${guildId}/addRule`,
    {
      method: 'POST',
      body: JSON.stringify({ title, description }),
      ignoreResponseError: true
    }
  );
  return response;
};
