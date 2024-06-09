import { request } from '@/common/func/request';

type FieldsToUpdate = {
  name: string;
  avatar: string;
  description: string;
  banner: string;
};

export const update = async (
  guildId: string,
  fields: FieldsToUpdate
) => {
  const response = await request<null>(
    `guilds/${guildId}/update`,
    {
      method: 'POST',
      body: JSON.stringify(fields),
      ignoreResponseError: true
    }
  );
  return response;
};
