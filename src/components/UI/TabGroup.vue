<template>
  <div class="tab-group">
    <UITab
      v-for="(tab, index) in tabs"
      :key="index"
      :type="tabsType"
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
  tabsType?: 'primary' | 'secondary';
  activeTab: number;
}>();
const emits = defineEmits<{
  (e: 'click', index: number): void;
}>();

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
