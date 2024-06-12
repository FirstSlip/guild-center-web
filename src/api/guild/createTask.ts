import { request } from '@/common/func/request';
import type { Task } from '@/ts/Task';

export const createTask = async (
  guildId: string,
  task: Omit<Task, 'taskId'>
) => {
  const response = await request<{ taskId: string }>(
    `guilds/${guildId}/create-task`,
    {
      method: 'POST',
      body: JSON.stringify(task),
      ignoreResponseError: true
    }
  );
  return response;
};
