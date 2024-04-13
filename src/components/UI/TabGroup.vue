<template>
  <div class="tab-group">
    <UITab
      v-for="(tab, index) in tabs"
      :key="index"
      :active="activeTab === index"
      @click="tabChange(index)"
    >
      {{ tab }}
    </UITab>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  tabs: string[];
  activeTab: number;
}>();
const emits = defineEmits(['click']);

const tabChange = (index: number) => {
  emits('click', index);
};
</script>

<style lang="scss" scoped>
.tab-group {
  display: flex;
  gap: 1rem;
}
</style>
