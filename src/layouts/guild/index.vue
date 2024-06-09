<template>
  <div>
    <WidgetsHeader />
    <!-- <div class="bg">
      <SVGBackground />
    </div> -->
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
.bg {
  position: absolute;
  top: $header-height;
  left: 0;
  overflow: hidden;
  max-width: 100%;
  z-index: -1;
}
.content {
  width: 100%;
  min-height: calc(100svh - $header-height);
  padding: 1rem 1rem;

  overflow: hidden;

  .cw {
    max-width: $main-width;
    height: 100%;
    margin: 0 auto;
  }
}
</style>
