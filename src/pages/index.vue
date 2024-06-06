<template>
  <div class="page">
    <Landing />
    <!-- <WidgetsModalWrapper>
      <template #title>Создать задачу</template>
      <template #icon>
        <SVGSword />
      </template>
      <template #body>123</template>
    </WidgetsModalWrapper> -->
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  pageTransition: {
    name: 'page-landing',
    mode: 'out-in'
  }
});
</script>
<style></style>
