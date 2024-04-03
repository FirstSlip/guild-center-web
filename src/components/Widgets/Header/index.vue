<template>
  <header class="header">
    <div class="cw">
      <WidgetsHeaderLogo />
      <WidgetsHeaderMenu />
      <WidgetsHeaderTools />
    </div>
  </header>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
header.header {
  position: relative;
  z-index: 1;
  width: 100%;
  height: $header-height;
  padding: 1rem 1rem;
  user-select: none;

  background-color: $header-background;

  .cw {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    max-width: 90.625rem;
    height: 100%;
    margin: 0 auto;
    gap: 1rem;
  }
}
</style>
