<template>
  <nuxt-link to="/" class="logo">
    <SVGLogo />
  </nuxt-link>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
a.logo {
  height: 100%;
  max-height: 100%;

  flex-shrink: 0;

  background: none;
  border: none;

  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
  }
}
</style>
