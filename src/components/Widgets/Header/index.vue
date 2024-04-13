<template>
  <header class="header">
    <div class="cw">
      <WidgetsHeaderLogo />
      <WidgetsHeaderMenu />
      <WidgetsHeaderUser
        v-if="user"
        :user="user"
        @sign-out="signOut"
      />
      <WidgetsHeaderTools v-else />
    </div>
  </header>
</template>
<script setup lang="ts">
import type { User } from '@/ts/User';

const user = useState<User | null>('user');

const signOut = () => {
  user.value = null;
};
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
    max-width: $main-width;
    height: 100%;
    margin: 0 auto;
    gap: 1rem;
  }
}
</style>
