import type { Message } from './Message';
import type { ShortUser } from './ShortUser';

export type Chat = {
  name?: string;
  avatar?: string;
  chatId: string;
  members: ShortUser[];
  messages: Message[];
};
