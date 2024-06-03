import { request } from '@/common/func/request';

export const signUp = async (bodyParams: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await request<undefined>('auth/sign-up', {
    body: JSON.stringify(bodyParams),
    method: 'POST'
  });
  return response;
};
