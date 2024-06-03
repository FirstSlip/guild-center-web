import type { Guild } from '@/ts/Guild';

export const useGuilds = (): Ref<Guild[]> => {
  return ref([
    {
      id: 1,
      name: 'WOW Test',
      games: ['World of Warcraft'],
      types: ['PvE', 'PvP'],
      description:
        'Guild for testing purposes in World of Warcraft.',
      membersCount: 7,
      avatarUrl:
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ec5f60f6-5a1f-4656-a9d1-7d19240b0e45/dfqsoun-24dfea7c-9b8a-4baf-9b4e-26e1da9f401c.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2VjNWY2MGY2LTVhMWYtNDY1Ni1hOWQxLTdkMTkyNDBiMGU0NVwvZGZxc291bi0yNGRmZWE3Yy05YjhhLTRiYWYtOWI0ZS0yNmUxZGE5ZjQwMWMuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.rk4YWh-URgrQPPqaeHMycYpeBUqm3lQKImG-XSy7Qk0'
    },
    {
      id: 2,
      name: 'Magic Quest',
      games: ['Final Fantasy XIV', 'Lost Ark'],
      types: ['PvE', 'PvP', 'Исследование'],
      description:
        'Embark on magical adventures with this guild in Final Fantasy XIV and Lost Ark.',
      membersCount: 4,
      avatarUrl:
        'https://static.vecteezy.com/system/resources/previews/022/085/982/original/wizard-logo-concept-black-and-white-color-hand-drawn-illustration-vector.jpg',
      bannerUrl:
        'https://ladb.ghost.io/content/images/wordpress/2021/06/library_hero.jpg'
    },
    {
      id: 3,
      name: 'MOBA Community',
      games: ['Dota 2', 'League of Legends', 'Smite'],
      types: ['PvP'],
      genres: ['MOBA'],
      description:
        'Community of MOBA enthusiasts, dominating the fields of Dota 2, League of Legends, and Smite.',
      membersCount: 9,
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtTrkg3Z0JWc3gcxzsMSPbSIUwMUhMZnl8-zgxuFdE3w&s',
      bannerUrl:
        'https://mmos.com/wp-content/uploads/2023/04/dota-2-new-frontiers-update-banner.jpg'
    },
    {
      id: 4,
      name: 'Real mans',
      games: ['Escape from Tarkov', 'Dota 2'],
      types: ['PvE', 'PvP'],
      description:
        'For hardcore gamers who brave the challenges of Escape from Tarkov and Dota 2.',
      membersCount: 8
    },
    {
      id: 5,
      name: 'Newbee helper',
      games: ['World of Warcraft'],
      types: ['Обучение', 'PvE'],
      description:
        'A supportive guild dedicated to helping newbies learn the ropes in World of Warcraft.',
      membersCount: 5,
      avatarUrl:
        'https://www.pngitem.com/pimgs/m/98-987896_team-logo-newbee-newbee-dota-2-logo-hd.png',
      bannerUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQM6F-fqFqQaw48GJyNQ6PbTvPfqn6gUisfJjeaHfQzIm-4Hp8Wi6QycdcZDnJfc1bqw&usqp=CAU'
    },
    {
      id: 6,
      name: 'Fantasy Realm',
      games: ['League of Legends'],
      types: ['Киберспорт', 'PvP'],
      genres: ['RPG'],
      description:
        'Enter the realm of fantasy and competition in League of Legends.',
      membersCount: 3
    },
    {
      id: 7,
      name: 'Craft Conquest',
      games: ['Black Desert'],
      types: ['PvE', 'Крафт'],
      description:
        'Masters of crafting and exploration in the vast world of Black Desert.',
      membersCount: 6,
      avatarUrl:
        'https://masterpiecer-images.s3.yandex.net/7057bd449c5c11ee8068da477c0f1ee2:upscaled',
      bannerUrl:
        'https://mmos.com/wp-content/uploads/2019/09/black-desert-online-ps4-awakening-banner.jpg'
    },
    {
      id: 8,
      name: 'Only Dota Enjoyer',
      games: ['Dota 2'],
      types: ['PvP'],
      genres: ['MOBA'],
      description:
        'Exclusively for those who revel in the joys of Dota 2 battles.',
      membersCount: 10
    },
    {
      id: 9,
      name: 'EFT Sherp',
      games: ['Escape from Tarkov'],
      types: ['PvE', 'PvP', 'Обучение'],
      description:
        'Guides and mentors for newcomers navigating the harsh world of Escape from Tarkov.',
      membersCount: 7
    },
    {
      id: 10,
      name: 'BDO Pub',
      games: ['Black Desert'],
      types: ['PvE', 'Крафт', 'Исследование', 'Торговля'],
      description:
        'Relax and socialize in the bustling atmosphere of Black Desert Online.',
      membersCount: 3
    },
    {
      id: 11,
      name: 'Traders Adventure',
      games: ['World of Warcraft', 'Black Desert', 'Lost Ark'],
      types: ['Торговля'],
      description:
        'For merchants and traders seeking riches and adventure across multiple worlds.',
      membersCount: 6
    },
    {
      id: 12,
      name: 'Tactical Warfare',
      games: ['Warframe'],
      types: ['PvP'],
      description:
        'Strategize and dominate the battlefield in the universe of Warframe.',
      membersCount: 8
    },
    {
      id: 13,
      name: 'Destiny Destroyers',
      games: ['Destiny 2'],
      types: ['PvE', 'PvP', 'Исследование'],
      description:
        'Unleash destruction and exploration in the vast world of Destiny 2.',
      membersCount: 5
    },
    {
      id: 14,
      name: 'Theatre',
      games: ['Black Desert'],
      types: ['RP'],
      description:
        'Immerse yourself in the art of roleplay on the stages of Black Desert.',
      membersCount: 9
    },
    {
      id: 15,
      name: 'Anime haters',
      games: ['Final Fantasy XIV'],
      types: ['PvE', 'Творчество'],
      description:
        'A guild for those who prefer fantastical adventures over anime-inspired worlds.',
      membersCount: 7
    },
    {
      id: 16,
      name: 'Tarkov vs SCAVS',
      games: ['Escape from Tarkov'],
      types: ['PvE', 'Крафт', 'Исследование', 'Торговля'],
      description:
        'Engage in the eternal struggle between PMC and Scav factions in Escape from Tarkov.',
      membersCount: 4
    },
    {
      id: 17,
      name: '[BOBR]',
      games: ['Smite'],
      types: ['PvP'],
      description:
        "Beware of bananas, oranges, and bananas... oh, wait, wrong BOBR. This one's about PvP battles in Smite.",
      membersCount: 6
    }
  ]);
};
