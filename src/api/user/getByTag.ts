import { request } from '@/common/func/request';
import type { User } from '@/ts/User';

export const getByTag = async (tag: string) => {
  const response = await request<{ user: User }>(`user/${tag}`, {
    ignoreResponseError: true
  });
  return response;
};
