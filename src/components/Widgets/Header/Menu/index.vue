<template>
  <nav class="menu">
    <UILink
      v-for="(item, index) in menuItems"
      :key="index"
      :to="item.href"
      padding="1rem"
      type="secondary"
    >
      {{ item.title }}
    </UILink>
  </nav>
</template>
<script setup lang="ts">
const menuItems = [
  /* {
    title: 'Главное',
    href: '/'
  }, */
  {
    title: 'Поиск гильдии',
    href: '/'
  },
  {
    title: 'О проекте',
    href: '/'
  },
  /* {
    title: 'test UI',
    href: '/test/ui'
  }, */
  {
    title: 'Поддержка',
    href: '/support'
  }
];
</script>
<style lang="scss" scoped>
nav.menu {
  display: flex;
  gap: 1.125rem;
}
</style>
