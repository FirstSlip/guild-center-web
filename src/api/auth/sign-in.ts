import { request } from '@/common/func/request';

export const signIn = async (bodyParams: {
  username: string;
  password: string;
}) => {
  const token = useCookie('token', {
    maxAge: 60 * 60 * 24 * 30
  });

  const response = await request<{ token: string }>(
    'auth/sign-in',
    {
      body: JSON.stringify(bodyParams),
      method: 'POST'
    }
  );
  if ($api.utils.isError(response)) {
    return { errorCode: response.errorCode };
  }

  if ($api.utils.isSuccess(response)) {
    token.value = response.data.token;
    return {
      success: true,
      data: {
        token: response.data.token
      }
    };
  }
  return null;
};
