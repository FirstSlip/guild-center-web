<template>
  <div>
    <WidgetsHeader />
    <div class="bg">
      <SVGBackground />
    </div>
    <div class="content">
      <div class="cw">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.bg {
  position: absolute;
  top: $header-height;
  left: 0;
  overflow: hidden;
  max-width: 100%;
  /* z-index: -1; */
}
.content {
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 1rem 1rem;
  user-select: none;

  .cw {
    max-width: 90.625rem;
    height: 100%;
    margin: 0 auto;
    gap: 1rem;
  }
}
</style>
