import type { ShortUser } from '@/ts/ShortUser';

export const filterUsersWithSearch = <T>(
  users: (ShortUser & T)[],
  search: string
) => {
  let searchTerms: string[];
  if (search.includes(' #')) {
    searchTerms = search
      .toLowerCase()
      .split(' #')
      .filter(Boolean);
  } else if (search.includes('#')) {
    searchTerms = search
      .toLowerCase()
      .split('#')
      .filter(Boolean);
  } else {
    searchTerms = [search.toLowerCase()].filter(Boolean);
  }

  return users.filter((user) => {
    return searchTerms.every(
      (term) =>
        user.username.toLowerCase().includes(term) ||
        ('#' + user.tag).toLowerCase().includes(term)
    );
  });
};
