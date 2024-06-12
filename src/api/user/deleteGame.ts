import { request } from '@/common/func/request';

export const deleteGame = async (name: string) => {
  const response = await request(`user/game/delete`, {
    method: 'POST',
    body: JSON.stringify({ name }),
    ignoreResponseError: true
  });
  return response;
};
