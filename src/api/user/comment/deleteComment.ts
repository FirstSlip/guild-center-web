import { request } from '@/common/func/request';

export const deleteComment = async (commentId: string) => {
  const response = await request('user/comment/delete', {
    body: JSON.stringify({
      commentId
    }),
    method: 'POST',
    ignoreResponseError: true
  });
  return response;
};
