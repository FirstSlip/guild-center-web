import { request } from '@/common/func/request';

export const addSteam = async (id: string) => {
  const response = await request(`steam`, {
    method: 'POST',
    body: JSON.stringify({ id })
  });
  return response as unknown as string;
};
