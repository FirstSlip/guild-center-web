<template>
  <div>
    <WidgetsHeader />
    <!-- <div class="bg">
      <SVGBackground />
    </div> -->
    <div class="content">
      <div class="cw">
        <div class="main-section">
          <GuildMainHeader />
          <NuxtPage />
        </div>
        <GuildMainMembers />
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

    display: grid;
    grid-template-columns: minmax(0, 1fr) 17.75rem;
    gap: 1.25rem;

    .main-section {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
