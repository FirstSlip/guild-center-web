import { request } from '@/common/func/request';

export const verifySteam = async (id: string) => {
  const response = await request<{ games: number }>(
    `steam/add`,
    {
      method: 'POST',
      body: JSON.stringify({ id })
    }
  );
  return response;
};
