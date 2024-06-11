import { request } from '@/common/func/request';
import type { Chat } from '@/ts/Chat';

export const getChats = async () => {
  const response = await request<{ chats: Chat[] }>(`chats`, {
    ignoreResponseError: true
  });
  return response;
};
