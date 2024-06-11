import type { Chat } from './Chat';
import type { ShortUser } from './ShortUser';

export type ChatWithUser = Omit<Chat, 'members' | 'messages'> & {
  otherUser: ShortUser;
};
