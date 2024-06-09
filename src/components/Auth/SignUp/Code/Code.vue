<template>
  <div class="email-code">
    <AuthFormWrapper @submit="submit" inputs-bold>
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
    const { user } = useProfile();
    useRouter().push(`/profile_${user.value?.tag || ''}`);
  }
};
</script>
<style lang="scss" scoped></style>
