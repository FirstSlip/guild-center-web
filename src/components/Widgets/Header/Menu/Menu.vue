<template>
  <nav class="menu">
    <UILink
      v-for="(item, index) in menuItems"
      :key="index"
      :to="item.href"
      padding="1.25rem"
      type="secondary"
      font-type="h5"
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

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
  }

  a {
    max-height: 100%;
  }
}
</style>
