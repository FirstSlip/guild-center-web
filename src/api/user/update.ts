import { request } from '@/common/func/request';

export const update = async (user: {
  shownUsername?: string;
  description?: string;
  avatar?: string;
  banner?: string;
}) => {
  const response = await request('user/update', {
    body: JSON.stringify(user),
    method: 'POST',
    ignoreResponseError: true
  });
  return response;
};
