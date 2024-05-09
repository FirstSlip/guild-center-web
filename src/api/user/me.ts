import { request } from '@/common/func/request';
import type { User } from '@/ts/User';

export const me = () => {
  return request<User>('user/me');
};
