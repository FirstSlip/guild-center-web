import { request } from '@/common/func/request';
import type { Task } from '@/ts/Task';

export const getTasks = async () => {
  const user = await request<{ tasks: Task[] }>(
    'user/me/tasks',
    {
      ignoreResponseError: true
    }
  );
  return user;
};
