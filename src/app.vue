<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { FriendRequest } from './ts/FriendRequest';

await useProfile().loadProfile();
await useChats().loadChats();
const profile = useProfile().user;

onMounted(() => {
  const socket = useSocket().socket.value;

  socket.on('connect', () => {
    console.log('Session connected');
  });

  socket.on('error', (error) => {
    console.error(error);
  });

  socket.on('disconnect', () => {
    console.log('Session disconnected');
  });

  socket.on('friendSuccess', async () => {
    await useProfile().loadProfile();
  });

  socket.on(
    'friendRequest',
    (req: { request: FriendRequest }) => {
      profile.value?.friendRequests.push(req.request);
    }
  );

  socket.on(
    'newMessage',
    (response: {
      chatId: string;
      message: string;
      date: string;
    }) => {
      console.log('app1');
      const newMessages = useChats().newMessages;
      console.log('app', newMessages.value);
      newMessages.value.push({
        chatId: response.chatId
      });
      console.log('app', newMessages.value);
    }
  );
});
</script>

<style lang="scss">
// Auth pages animation
.page-auth-enter-active,
.page-auth-leave-active {
  transition: all 0.4s;
}
.page-auth-enter-from {
  transform: translateX(100%);
  opacity: 0;
  filter: blur(1rem);
}
.page-auth-leave-to {
  transform: translateX(-100%);
  opacity: 0;
  filter: blur(1rem);
}
// Landing page animation
.page-landing-enter-active,
.page-landing-leave-active {
  transition: all 0.4s;
}
.page-landing-enter-from,
.page-landing-leave-to {
  opacity: 0;
}
</style>
