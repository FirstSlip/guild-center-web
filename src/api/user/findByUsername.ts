import { request } from '@/common/func/request';
import type { User } from '@/ts/User';

export const findByUsername = async (
  username: string,
  tag: string
) => {
  const response = await request<{ users: User[] }>(
    `user/find?username=${username}&tag=${tag}`,
    {
      ignoreResponseError: true
    }
  );
  return response;
};
