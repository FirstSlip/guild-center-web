import { request } from '@/common/func/request';

export const acceptRequest = async (code: string) => {
  const response = await request(
    `friends/accept-request/${code}`,
    {
      method: 'POST',
      ignoreResponseError: true
    }
  );
  return response;
};
