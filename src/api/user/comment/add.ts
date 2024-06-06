import { request } from '@/common/func/request';

export const add = async (receiverTag: string, text: string) => {
  const response = await request('user/comment/add', {
    body: JSON.stringify({
      receiverTag,
      text
    }),
    method: 'POST',
    ignoreResponseError: true
  });
  return response;
};
