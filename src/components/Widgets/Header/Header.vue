<template>
  <header class="header">
    <div class="cw">
      <WidgetsHeaderLogo />
      <WidgetsHeaderMenu />
      <WidgetsHeaderUser
        v-if="profile"
        :profile="profile"
        @sign-out="signOut"
      />
      <WidgetsHeaderTools v-else />
    </div>
  </header>
</template>
<script setup lang="ts">
const profile = useProfile().user;

const signOut = () => {
  useProfile().signOut();
  useRouter().push('/');
};
</script>
<style lang="scss" scoped>
header.header {
  position: relative;
  z-index: 1;
  width: 100%;
  height: $header-height;
  padding: 0.125rem 1rem;
  user-select: none;

  background-color: $header-background;

  .cw {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    max-width: $main-width;
    height: 100%;
    margin: 0 auto;
    gap: 1rem;

    @media (max-width: $adaptive-breakpoint-normal) {
      gap: 0.25rem;
    }
  }
}
</style>
