export const generateAvatarColor = (
  username: string | undefined
) => {
  const totalColors = 8;
  let hash = 0;
  let name = username || 'Загрузка...';
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash % totalColors);

  return {
    bg: `var(--avatar-bg-${index + 1})`,
    stroke: `var(--avatar-stroke-${index + 1})`
  };
};
