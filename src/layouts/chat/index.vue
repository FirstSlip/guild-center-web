<template>
  <div>
    <WidgetsHeader />
    <div class="content">
      <div class="cw">
        <NuxtPage />
      </div>
    </div>
    <WidgetsFooter />
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.content {
  width: 100%;
  min-height: calc(100svh - $header-height);
  padding: 1rem 1rem;

  overflow: hidden;

  .cw {
    max-width: 69.375rem;
    height: 100%;
    margin: 0 auto;
  }
}
</style>
