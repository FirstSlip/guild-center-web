<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
.page-auth-enter-active {
  transition: all 0.4s;
}
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
</style>
