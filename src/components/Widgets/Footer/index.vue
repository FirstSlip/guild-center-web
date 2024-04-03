<template>
  <footer class="footer">
    <div class="cw">
      <!-- <WidgetsHeaderLogo />
      <WidgetsHeaderMenu />
      <WidgetsHeaderTools /> -->
      <WidgetsFooterContacts />
      <SVGLogo />
    </div>
  </footer>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
footer.footer {
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 1rem 1rem;
  user-select: none;

  background-color: $footer-background;
  .cw {
    max-width: $main-width;
    height: 100%;
    margin: 0 auto;
    padding: 3.5rem 0 2.25rem;
    gap: 1rem;
  }
}
</style>
