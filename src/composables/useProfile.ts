import type { UserMe } from '@/ts/UserMe';

export const useProfile = () => {
  const user = useState<UserMe | null>('user', () => null);

  const setUser = (account: UserMe) => {
    user.value = account;
  };

  const loadProfile = async () => {
    const response = await $api.user.me();
    if ($api.utils.isSuccess(response)) {
      setUser(response.data.user);
    }
  };

  return {
    user,
    setUser,
    loadProfile
  };
};
