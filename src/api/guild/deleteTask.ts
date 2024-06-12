import { request } from '@/common/func/request';

export const deleteTask = async (
  guildId: string,
  taskId: string
) => {
  const response = await request(
    `guilds/${guildId}/${taskId}/delete-task`,
    {
      method: 'POST',
      ignoreResponseError: true
    }
  );
  return response;
};
