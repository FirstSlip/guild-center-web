<template>
  <div class="email-code">
    <AuthFormWrapper @submit="submit">
      <template v-slot:header>
        Мы отправили код активации на вашу почту!
      </template>
      <template v-slot:inputs>
        <UICodeInput fill />
      </template>
      <template v-slot:buttons>
        <UIButton fill>Продолжить</UIButton>
        <UIButton fill type="back" @click="useRouter().back()">
          Отмена
        </UIButton>
      </template>
    </AuthFormWrapper>
  </div>
</template>
<script setup lang="ts">
import type { User } from '@/ts/User';

const submit = () => {
  useState<User | null>('user').value = {
    name: useRoute().query.name,
    tag: '#21822',
    email: 'ilya@mail.ru'
  };
  useRouter().push('/profile');
};
</script>
<style lang="scss" scoped></style>
