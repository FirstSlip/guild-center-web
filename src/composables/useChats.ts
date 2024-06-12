import type { Chat } from '@/ts/Chat';

export const useChats = () => {
  const chats = useState<Chat[]>('chats', () => []);
  const newMessages = useState<
    {
      chatId: string;
    }[]
  >('newMessages', () => []);

  const loadChats = async () => {
    const response = await $api.chat.getChats();
    if ($api.utils.isSuccess(response)) {
      chats.value = response.data.chats;
    }
  };

  return {
    chats,
    newMessages,
    loadChats
  };
};
