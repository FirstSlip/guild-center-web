import { request } from '@/common/func/request';
import type { UserMe } from '@/ts/UserMe';

export const me = async () => {
  const user = await request<{ user: UserMe }>('user/me', {
    ignoreResponseError: true
  });
  return user;
};
