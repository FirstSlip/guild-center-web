<template>
  <div class="email-code">
    <AuthFormWrapper @submit="submit">
      <template v-slot:header>
        Мы отправили код активации на вашу почту!
      </template>
      <template v-slot:inputs>
        <UICodeInput fill v-model="code" :length="6" />
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
const code = ref('');

const submit = async () => {
  if (code.value.length !== 6) {
    return;
  }
  const response = await $api.auth.signUpCode(
    code.value.toUpperCase()
  );
  if ($api.utils.isSuccess(response)) {
    await useProfile().loadProfile();
    useRouter().push('/profile');
  }
  /* useState<User | null>('user').value = {
    name: useRoute().query.name,
    tag: '#21822',
    email: 'ilya@mail.ru'
  }; */
  /* useProfile().setUser({
    name: useRoute().query.name,
    tag: '#21822',
    email: 'ilya@mail.ru'
  });
  useRouter().push('/profile'); */
  /* const response = await $api.auth.signIn({
    code:
  }); */
  /* if ($api.utils.isSuccess(response)) {
    await useProfile().loadProfile();
    useRouter().push('/profile');
  } */
};
</script>
<style lang="scss" scoped></style>
