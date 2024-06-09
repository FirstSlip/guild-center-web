import { request } from '@/common/func/request';

export const declineRequest = async (code: string) => {
  const response = await request(
    `friends/decline-request/${code}`,
    {
      method: 'POST',
      ignoreResponseError: true
    }
  );
  return response;
};
