<template>
  <AuthSignIn />
</template>
<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  pageTransition: {
    name: 'page-auth',
    mode: 'out-in'
  }
});
</script>
<style lang="scss" scoped></style>
