import { request } from '@/common/func/request';

export const addGame = async (name: string) => {
  const response = await request(`user/game/add`, {
    method: 'POST',
    body: JSON.stringify({ name }),
    ignoreResponseError: true
  });
  return response;
};
