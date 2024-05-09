export const useAvatar = () => {
  return useProfile().user.value?.avatar;
};
