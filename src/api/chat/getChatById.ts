import { request } from '@/common/func/request';
import type { Message } from '@/ts/Message';

export const getChatById = async (chatId: string) => {
  const response = await request<{ messages: Message[] }>(
    `chats/${chatId}`,
    {
      ignoreResponseError: true
    }
  );
  return response;
};
