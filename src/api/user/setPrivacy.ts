import { request } from '@/common/func/request';

type PrivacyFields =
  | 'friends'
  | 'comments'
  | 'guilds'
  | 'gameAccounts'
  | 'games';

export const setPrivacy = async (
  privateFields: PrivacyFields[],
  unPrivateFields: PrivacyFields[]
) => {
  const response = await request('user/update', {
    body: JSON.stringify({
      privateFields,
      unPrivateFields
    }),
    method: 'POST',
    ignoreResponseError: true
  });
  return response;
};
