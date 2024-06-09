import { request } from '@/common/func/request';
import type { User } from '@/ts/User';

export const findByUsername = async (
  username: string,
  tag: string,
  page: number
) => {
  const response = await request<{ users: User[] }>(
    `user/find?username=${username}&tag=${tag}&page=${page}`,
    {
      ignoreResponseError: true
    }
  );
  return response;
};
