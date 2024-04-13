import type { User } from '@/ts/User';
export const useUseAvatar = () => {
  return useState<User | null>('user').value?.avatar;
};
