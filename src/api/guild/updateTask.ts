import { request } from '@/common/func/request';
import type { Task } from '@/ts/Task';

export const updateTask = async (
  guildId: string,
  taskId: string,
  task: Omit<Task, 'taskId'>
) => {
  const response = await request<{ taskId: string }>(
    `guilds/${guildId}/${taskId}/update`,
    {
      method: 'POST',
      body: JSON.stringify(task),
      ignoreResponseError: true
    }
  );
  return response;
};
