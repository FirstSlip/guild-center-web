import type { Guild } from '@/ts/Guild';

export const useGuild = () => {
  const currentGuild = useState<Guild | null>(
    'current-guild',
    () => null
  );

  const setCurrentGuild = (guild: Guild | null) => {
    currentGuild.value = guild;
  };

  const resetCurrentGuild = () => {
    currentGuild.value = null;
  };

  return {
    currentGuild,
    setCurrentGuild,
    resetCurrentGuild
  };
};
