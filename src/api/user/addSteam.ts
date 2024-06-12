import { request } from '@/common/func/request';

export const addSteam = async () => {
  const response = await request(`steam`, {
    ignoreResponseError: true
  });
  return response;
};
