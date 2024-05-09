import type { User } from '@/ts/User';

export const useProfile = () => {
  const user = useState<User | null>('user', () => null);

  const setUser = (account: User) => {
    user.value = account;
  };

  return {
    user,
    setUser
  };
};
