export const generateAvatarColor = (
  username: string | undefined
): string => {
  const totalColors = 8;
  let hash = 0;
  let name = username || 'Error';
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash % totalColors);

  return `var(--avatar-bg-${index + 1})`;
};
